"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Coupon from "public/components/coupon";
import LoginModal from "public/components/loginModal";
import PixCard from "public/components/payment/pixCard/pixCard";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { CouponValidationResponse } from "types/couponType";
import { OrderType } from "types/orderType";
import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import PackageCardCompact from "public/cards/packageBigoCardCompact/card";
import { ProductInnerPage } from "./style";

const ProductSlugPage = () => {
  const params = useParams();
  const route = useRouter();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) ?? "";
  const packageId = searchParams.get("package");
  const couponFromParams = searchParams.get("coupon") ?? undefined;

  const theme = useTheme();
  const { products } = useProducts();
  const product = products?.find(
    (p: ProductType) => formatString(p.name) === slug,
  );
  const item = product?.packages.find(
    (pkg: PackageType) => pkg.id === packageId,
  );
  const [blockInput, setBlockInput] = useState<boolean>(false);
  const { logged, user } = useAuth();
  const [rechargeBigoId, setRechargeBigoId] = useState<string>(
    logged && user?.rechargeBigoId ? user.rechargeBigoId : "",
  );
  const hasInitializedFromUser = useRef<boolean>(false);
  const [error, setError] = useState<string>();
  const [coupon, setCoupon] = useState<string>("");
  const [openCoupon, setOpenCoupon] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");
  const [couponSuccess, setCouponSuccess] = useState<string>("");
  const [couponApplied, setCouponApplied] =
    useState<CouponValidationResponse>();
  const [sessionOrder, setSessionOrder] = useState<OrderType | null>(null);
  const [sessionPackage, setSessionPackage] = useState<PackageType | null>(
    null,
  );
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (!packageId) {
      route.replace(slug ? `/product?slug=${slug}` : "/home");
    }
  }, [packageId, slug, route]);

  useEffect(() => {
    const sessionOrderStorage = sessionStorage.getItem("order");
    if (sessionOrderStorage) {
      const sessionOrderParsed: OrderType = JSON.parse(sessionOrderStorage);
      if (!logged) {
        setLoginModal(true);
        return;
      }
      setRechargeBigoId(
        sessionOrderParsed.orderItem.recharge.userIdForRecharge,
      );
      if (
        sessionOrderParsed.orderStatus !== "CREATED" ||
        !user ||
        user.id !== sessionOrderParsed.userId
      ) {
        sessionStorage.clear();
        return route.replace("/home");
      }
      if (sessionOrderParsed.couponUsages.length > 0) {
        const couponUsage = sessionOrderParsed.couponUsages[0];
        const couponData = couponUsage.coupon;
        const discountAmount =
          sessionOrderParsed.basePrice - sessionOrderParsed.price;
        const appliedCoupon: CouponValidationResponse = {
          valid: true,
          discountAmount: discountAmount,
          finalAmount: sessionOrderParsed.price,
          coupon: {
            id: couponData.id,
            title: couponData.title,
            discountPercentage: couponData.discountPercentage
              ? Number(couponData.discountPercentage)
              : null,
            discountAmount: couponData.discountAmount
              ? Number(couponData.discountAmount)
              : null,
            isFirstPurchase: couponData.isFirstPurchase,
          },
        };
        setCoupon(couponData.title);
        setCouponApplied(appliedCoupon);
        setCouponSuccess(`Cupom aplicado!`);
      }
      const mappedPackage: PackageType = {
        id: sessionOrderParsed.orderItem.package.id,
        name: sessionOrderParsed.orderItem.package.name,
        amountCredits: sessionOrderParsed.orderItem.recharge.amountCredits,
        imgCardUrl: sessionOrderParsed.orderItem.package.imgCardUrl,
        isActive: true,
        isOffer: false,
        price: +sessionOrderParsed.price,
        basePrice: +sessionOrderParsed.basePrice,
        productId: sessionOrderParsed.orderItem.productId,
        paymentMethods: [
          {
            id: sessionOrderParsed.paymentId,
            name: sessionOrderParsed.payment
              .name as PackageType["paymentMethods"][number]["name"],
            price: +sessionOrderParsed.price,
          },
        ],
      };
      setSessionPackage(mappedPackage);
      setBlockInput(true);
      setSessionOrder(sessionOrderParsed);
      return;
    }

    if (products && products.length > 0 && packageId) {
      const productWithPackage = products.find((p: ProductType) =>
        p.packages.some((pkg: PackageType) => pkg.id === packageId),
      );
      if (!productWithPackage) {
        route.replace("/home");
      }
    }
  }, [products, packageId, route, logged, user]);

  useEffect(() => {
    if (
      !sessionOrder &&
      logged &&
      user?.rechargeBigoId &&
      !hasInitializedFromUser.current
    ) {
      setRechargeBigoId(user.rechargeBigoId);
      hasInitializedFromUser.current = true;
    }
  }, [logged, user, sessionOrder]);

  useEffect(() => {
    if (!couponFromParams) return;
    const upperCoupon = couponFromParams.toUpperCase();
    setCoupon(upperCoupon);
    setOpenCoupon(true);
    if (couponFromParams && item && logged) {
      handleApplyCoupon(upperCoupon);
    } else if (couponFromParams && !logged) {
      setCouponError("Login necessário para aplicar o cupom");
      setCouponSuccess("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponFromParams, item, logged]);

  const handleMouseDown = () => {
    setError("");
    if (!couponApplied?.valid) {
      setCouponError("");
      setCouponSuccess("");
    } else {
      setCouponError("");
    }
  };

  const handleApplyCoupon = (couponValue?: string) => {
    if (
      couponApplied?.valid &&
      couponApplied.coupon.title.toUpperCase() === coupon.toUpperCase()
    ) {
      return;
    }
    const couponToUse = couponValue || coupon;

    if (couponToUse === "") {
      setCouponError("Insira um cupom");
      return;
    }
    if (!logged) {
      setLoginModal(true);
      return;
    }
    if (!item && !sessionPackage) return;

    const targetPackage = sessionPackage ?? item;
    if (!targetPackage) return;

    setCouponLoading(true);
    connectionAPIPost<CouponValidationResponse>(
      "/orders/validate-coupon-by-package",
      {
        packageId: targetPackage.id,
        paymentMethodId: targetPackage.paymentMethods[0].id,
        couponTitle: couponToUse.toUpperCase(),
        userIdForRecharge: rechargeBigoId,
      },
    )
      .then((res) => {
        if (res.valid === true) {
          setCouponSuccess(`Cupom aplicado!`);
          setCouponApplied(res);
          setOpenCoupon(false);
          setCouponError("");
        } else {
          const message = res.message;
          if (
            message === "Coupon is not active" ||
            message === "Coupon has expired" ||
            message === "Coupon usage limit reached"
          ) {
            setCouponError("Cupom expirado");
            setCouponSuccess("");
            setCouponApplied(null);
          } else if (
            message ===
            "First purchase coupon can only be used by new customers"
          ) {
            setCouponError("Cupom exclusivo para primeira compra");
            setCouponSuccess("");
            setCouponApplied(null);
          } else if (
            message === "This coupon can only be used once per bigoId"
          ) {
            setCouponError("Cupom já utilizado");
            setCouponSuccess("");
            setCouponApplied(null);
          } else {
            setCouponError("Cupom inválido");
            setCouponSuccess("");
            setCouponApplied(null);
          }
        }
      })
      .catch(() => {
        setCouponError("Não foi possível aplicar o cupom");
        setCouponSuccess("");
        setCouponApplied(null);
      })
      .finally(() => {
        setCouponLoading(false);
      });
  };

  const displayItem = sessionPackage ?? item;
  if (!displayItem && products && products.length > 0) {
    route.replace("/home");
    return null;
  }

  if (!packageId) {
    return (
      <div className="container">
        <span className="loading" />
      </div>
    );
  }

  return (
    <ProductInnerPage onMouseDown={handleMouseDown}>
      <Text align="center" fontName="REGULAR_SEMI_BOLD">
        ID DE USUÁRIO
      </Text>
      <Input
        placeholder="Insira seu ID de usuário"
        margin="16px 0 0 0"
        height={48}
        value={rechargeBigoId || ""}
        onChange={(e) =>
          !blockInput && setRechargeBigoId(e.target.value.replace(/\s/g, ""))
        }
      />
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        PACOTE PARA RECARGA
      </Text>
      <div className="cardEnviroment">
        {displayItem && (
          <PackageCardCompact
            paymentPage
            paymentIndex={0}
            item={displayItem}
            valueWithDicount={
              couponApplied?.valid
                ? couponApplied.finalAmount
                : sessionOrder?.price
            }
            selected
          />
        )}
      </div>
      <Text margin="32px 0 16px 0" align="center" fontName="REGULAR_SEMI_BOLD">
        PAGAMENTO
      </Text>

      <Coupon
        coupon={coupon?.toUpperCase() || ""}
        setCoupon={setCoupon}
        handleApplyCoupon={handleApplyCoupon}
        blockInput={blockInput}
        couponLoading={couponLoading}
        couponError={couponError}
        setCouponError={setCouponError}
        couponSuccess={couponSuccess}
        openCoupon={openCoupon}
        setOpenCoupon={setOpenCoupon}
        couponApplied={couponApplied}
      />

      <section className="paymentMethods">
        {displayItem && (
          <PixCard
            couponTitle={
              couponApplied?.valid && couponApplied.coupon.title.toUpperCase()
            }
            item={displayItem}
            valueWithDicount={
              couponApplied?.valid
                ? couponApplied.finalAmount
                : sessionOrder?.price
            }
            rechargeBigoId={rechargeBigoId}
            setError={setError}
            setBlockInput={setBlockInput}
          />
        )}
        <div className="errorMessage">
          <Text align="center" fontName="TINY_MEDIUM" color={theme.pending}>
            {error}
          </Text>
        </div>
      </section>
      {loginModal && <LoginModal setLoginModal={() => setLoginModal(false)} />}
    </ProductInnerPage>
  );
};

export default ProductSlugPage;
