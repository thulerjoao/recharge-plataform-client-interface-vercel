"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import LoginModal from "public/components/loginModal";
import PixCard from "public/components/payment/pixCard/pixCard";
import React, { useEffect, useRef, useState } from "react";
import { CouponValidationResponse } from "types/couponType";
import { OrderType } from "types/orderType";
import { PackageType } from "types/productTypes";
import { ProductInnerPage } from "./style";

type Props = {
  packageId: string;
  couponFromParams?: string;
};

const PaymentPage = ({ packageId, couponFromParams }: Props) => {
  const { product } = useProducts();
  const [blockInput, setBlockInput] = useState<boolean>(false);
  const { logged, user } = useAuth();

  const item: PackageType =
    product &&
    product.packages.find((item: PackageType) => item.id === packageId);
  const [rechargeBigoId, setRechargeBigoId] = useState<string>(
    logged && user?.rechargeBigoId ? user.rechargeBigoId : "",
  );
  const hasInitializedFromUser = useRef<boolean>(false);
  const [error, setError] = useState<string>();
  const [coupon, setCoupon] = useState<string>("");
  const [openCoupon, setOpenCoupon] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");
  const [couponSuccess, setCouponSuccess] =
    useState<CouponValidationResponse>();
  const [sessionOrder, setSessionOrder] = useState<OrderType | null>(null);
  const [sessionPackage, setSessionPackage] = useState<PackageType | null>(
    null,
  );
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const route = useRouter();

  useEffect(() => {
    const sessionOrder = sessionStorage.getItem("order");
    if (sessionOrder) {
      if (!logged) {
        setLoginModal(true);
        return;
      }
      const order = JSON.parse(sessionOrder);
      setRechargeBigoId(order.orderItem.recharge.userIdForRecharge);
      if (
        order.orderStatus !== "CREATED" ||
        !user ||
        user.id !== order.userId
      ) {
        sessionStorage.clear();
        return route.replace("/home");
      }
      if (order.couponUsages.length > 0) {
        setCoupon(order.couponUsages[0].coupon.title);
        setOpenCoupon(true);
      }
      const sessionPackage: PackageType = {
        id: order.orderItem.package.id,
        name: order.orderItem.package.name,
        amountCredits: order.orderItem.recharge.amountCredits,
        imgCardUrl: order.orderItem.package.imgCardUrl,
        isActive: true,
        isOffer: false,
        price: +order.price,
        basePrice: +order.basePrice,
        productId: order.productId,
        paymentMethods: [
          {
            id: order.paymentId,
            name: order.payment.name,
            price: +order.price,
          },
        ],
      };
      setSessionPackage(sessionPackage);
      setBlockInput(true);
      setSessionOrder(order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //update rechargeBigoId when user is loaded (only if there is no sessionOrder)
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

  // Validate package exists only for new purchases (not for pending orders)
  useEffect(() => {
    const sessionOrderStorage = sessionStorage.getItem("order");
    if (sessionOrderStorage) return;
    if (
      product &&
      product.packages &&
      product.packages.length > 0 &&
      packageId
    ) {
      const packageExists = product.packages.some(
        (pkg: PackageType) => pkg.id === packageId,
      );

      if (!packageExists) {
        route.replace("/home");
      }
    }
  }, [product, packageId, route]);

  useEffect(() => {
    if (!couponFromParams) {
      return;
    }
    const upperCoupon = couponFromParams.toUpperCase();
    setCoupon(upperCoupon);
    setOpenCoupon(true);
    if (couponFromParams && item && logged) {
      handleApplyCoupon(upperCoupon);
    } else if (couponFromParams && !logged) {
      setCouponError("Login necessário para aplicar o cupom");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponFromParams, item, logged]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setError("");
    !couponSuccess && setCouponError("");
  };

  const handleApplyCoupon = (couponValue?: string) => {
    const couponToUse = couponValue || coupon;

    if (couponToUse === "") {
      setCouponError("Insira um cupom");
      return;
    }
    if (!logged) {
      setLoginModal(true);
      return;
    }
    if (!item) return;

    setCouponLoading(true);
    connectionAPIPost<CouponValidationResponse>(
      "/orders/validate-coupon-by-package",
      {
        packageId: item.id,
        paymentMethodId: item.paymentMethods[0].id,
        couponTitle: couponToUse.toUpperCase(),
      },
    )
      .then((res) => {
        if (res.valid === true) {
          setCouponError(
            `Cupom de ${res.coupon.discountAmount ? "R$ " + res.coupon.discountAmount : res.coupon.discountPercentage + "%"} aplicado!`,
          );
          setCouponSuccess(res);
        } else {
          const message = res.message;
          if (
            message === "Coupon is not active" ||
            message === "Coupon has expired" ||
            message === "Coupon usage limit reached"
          ) {
            setCouponError("Cupom expirado");
            setCouponSuccess(null);
          } else if (
            message ===
            "First purchase coupon can only be used by new customers"
          ) {
            setCouponError("Cupom exclusivo para primeira compra");
            setCouponSuccess(null);
          } else {
            setCouponError("Cupom inválido");
            setCouponSuccess(null);
          }
        }
      })
      .catch(() => {
        setCouponError("Não foi possível aplicar o cupom");
      })
      .finally(() => {
        setCouponLoading(false);
      });
  };

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
        onChange={(e) => !blockInput && setRechargeBigoId(e.target.value)}
      />
      {!openCoupon && (
        <Text
          fontName="SMALL_MEDIUM"
          color={Theme.colors.secondaryText}
          underline
          margin="8px 12px 0 0"
          align="end"
          pointer
          onClick={() => !blockInput && setOpenCoupon(!openCoupon)}
        >
          Cupom de desconto
        </Text>
      )}
      {openCoupon && (
        <>
          <form
            className="couponContainer"
            onSubmit={(e) => {
              e.preventDefault();
              handleApplyCoupon();
            }}
          >
            <Input
              height={36}
              value={coupon?.toUpperCase()}
              onChange={(e) => !blockInput && setCoupon(e.target.value)}
              placeholder="Insira o cupom"
            />
            <Button
              title="Aplicar"
              onClick={() => handleApplyCoupon()}
              width={185}
              height={28}
              loading={couponLoading}
              disabled={
                couponLoading ||
                blockInput ||
                (couponSuccess && couponSuccess.valid
                  ? couponSuccess.coupon.title.toUpperCase() ===
                    coupon.toUpperCase()
                  : false)
              }
              isNotSelected={
                blockInput ||
                (couponSuccess && couponSuccess.valid
                  ? couponSuccess.coupon.title.toUpperCase() ===
                    coupon.toUpperCase()
                  : false)
              }
            />
          </form>
          {(couponError || couponSuccess) && (
            <Text
              align="center"
              fontName="TINY_MEDIUM"
              color={
                couponSuccess ? Theme.colors.approved : Theme.colors.pending
              }
              margin="2px 0 -16.5px 0"
            >
              {couponError}
            </Text>
          )}
        </>
      )}
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        PACOTE PARA RECARGA
      </Text>
      <div className="cardEnviroment">
        {((product && item) || sessionPackage) && (
          <PackageCard
            paymentIndex={0}
            item={sessionPackage ? sessionPackage : item}
            valueWithDicount={
              couponSuccess?.valid
                ? couponSuccess.finalAmount
                : sessionOrder?.price
            }
            selected
          />
        )}
      </div>
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        FORMAS DE PAGAMENTO
      </Text>
      <section className="paymentMethods">
        {(item || sessionPackage) && (
          <PixCard
            couponTitle={
              couponSuccess?.valid && couponSuccess.coupon.title.toUpperCase()
            }
            item={sessionPackage ? sessionPackage : item}
            valueWithDicount={
              couponSuccess?.valid
                ? couponSuccess.finalAmount
                : sessionOrder?.price
            }
            rechargeBigoId={rechargeBigoId}
            setError={setError}
            setBlockInput={setBlockInput}
          />
        )}
        {/* <CreditcardCard /> */}
        <div className="errorMessage">
          <Text
            align="center"
            fontName="TINY_MEDIUM"
            color={Theme.colors.pending}
          >
            {error}
          </Text>
        </div>
      </section>
      {loginModal && <LoginModal setLoginModal={() => setLoginModal(false)} />}
    </ProductInnerPage>
  );
};

export default PaymentPage;
