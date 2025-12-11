"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import PackageCard from "public/cards/packageCard/card";
import LoginModal from "public/components/loginModal";
import PixCard from "public/components/payment/pixCard/pixCard";
import React, { useEffect, useState } from "react";
import { CouponValidationResponse } from "types/couponType";
import { PackageType } from "types/productTypes";
import { ProductInnerPage } from "./style";

type Props = {
  packageId: string;
  couponFromParams?: string;
};

const PaymentPage = ({ packageId, couponFromParams }: Props) => {
  const { product } = useProducts();
  const initialUserId = sessionStorage.getItem("userId");
  const [blockId, setBlockId] = useState<boolean>(false);

  const item =
    product &&
    product.packages.find((item: PackageType) => item.id === packageId);
  const [rechargeBigoId, setRechargeBigoId] = useState<string>(
    initialUserId ? initialUserId : "",
  );
  const [paymentIndex, setPaymentIndex] = useState<number>();
  const [error, setError] = useState<string>();
  const [coupon, setCoupon] = useState<string>("");
  const [openCoupon, setOpenCoupon] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");
  const [couponSuccess, setCouponSuccess] =
    useState<CouponValidationResponse>();
  const { logged } = useAuth();
  const [loginModal, setLoginModal] = useState<boolean>(false);

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

  useEffect(() => {
    const paymentIndex = sessionStorage.getItem("paymentMethod");
    setPaymentIndex(+paymentIndex);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setError("");
    !couponSuccess && setCouponError("");
  };

  const handleApplyCoupon = (couponValue?: string) => {
    if (!logged) {
      setLoginModal(true);
      return;
    }
    if (!item) return;
    const couponToUse = couponValue || coupon;
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
        value={rechargeBigoId && rechargeBigoId}
        onChange={(e) => !blockId && setRechargeBigoId(e.target.value)}
      />
      {!openCoupon && (
        <Text
          fontName="SMALL_MEDIUM"
          color={Theme.colors.secondaryText}
          underline
          margin="8px 12px 0 0"
          align="end"
          pointer
          onClick={() => setOpenCoupon(!openCoupon)}
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
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Insira o cupom"
            />
            <Button
              title="Aplicar"
              onClick={() => handleApplyCoupon()}
              width={185}
              height={28}
              rounded
              loading={couponLoading}
              disabled={
                couponLoading ||
                (couponSuccess && couponSuccess.valid
                  ? couponSuccess.coupon.title.toUpperCase() ===
                    coupon.toUpperCase()
                  : false)
              }
              isNotSelected={
                couponSuccess && couponSuccess.valid
                  ? couponSuccess.coupon.title.toUpperCase() ===
                    coupon.toUpperCase()
                  : false
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
        {product && item && (
          <PackageCard
            paymentIndex={paymentIndex}
            item={item}
            discountAmount={
              couponSuccess && couponSuccess.valid
                ? couponSuccess.finalAmount
                : undefined
            }
            selected
          />
        )}
      </div>
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        FORMAS DE PAGAMENTO
      </Text>
      <section className="paymentMethods">
        {item && (
          <PixCard
            couponTitle={
              couponSuccess?.valid && couponSuccess.coupon.title.toUpperCase()
            }
            rechargeBigoId={rechargeBigoId}
            packageId={item.id}
            paymentMethodId={item.paymentMethods[0].id}
            price={
              couponSuccess?.valid
                ? couponSuccess.finalAmount
                : item && item.paymentMethods[0].price
            }
            setError={setError}
            setBlockId={setBlockId}
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
