"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import LoginModal from "public/components/loginModal";
import PixCard from "public/components/payment/pixCard/pixCard";
import React, { useEffect, useState } from "react";
import { CouponValidationResponse } from "types/couponType";
import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import PackageCard from "../../../../public/cards/packageCard/card";
import { ProductInnerPage } from "./style";

type Props = {
  id: string;
  slug: string;
};

const PaymentPage = ({ id, slug }: Props) => {
  const { products } = useProducts();
  const product = products.find(
    (item: ProductType) => formatString(item.name) === slug,
  );
  const item =
    product &&
    product.packages.find((item: PackageType) => formatString(item.id) === id);
  const initialUserId = sessionStorage.getItem("userId");
  const [blockId, setBlockId] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(
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

  useEffect(() => {
    const paymentIndex = sessionStorage.getItem("paymentMethod");
    setPaymentIndex(+paymentIndex);
    const memoryUserId = sessionStorage.getItem("userId");
    setUserId(memoryUserId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setError("");
    !couponSuccess && setCouponError("");
  };

  const handleApplyCoupon = () => {
    setCouponLoading(true);
    connectionAPIPost<CouponValidationResponse>(
      "/orders/validate-coupon-by-package",
      {
        packageId: item.id,
        paymentMethodId: item.paymentMethods[0].id,
        couponTitle: coupon.toUpperCase(),
      },
    )
      .then((res) => {
        if (res.valid === true) {
          // setCouponError("Cupom aplicado!");
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
      .catch((err) => {
        setCouponError("Erro ao aplicar cupom");
      })
      .finally(() => {
        setCouponLoading(false);
      });
  };

  // {valid: false, message: 'Coupon not found'}

  return (
    <ProductInnerPage onMouseDown={handleMouseDown}>
      <Text align="center" fontName="REGULAR_SEMI_BOLD">
        ID DE USUÁRIO
      </Text>
      <Input
        placeholder="Insira seu ID de usuário"
        margin="16px 0 0 0"
        height={48}
        value={userId && userId}
        onChange={(e) => !blockId && setUserId(e.target.value)}
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
          <div className="couponContainer">
            <Input
              height={36}
              value={coupon.toUpperCase()}
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
              disabled={couponLoading}
            />
          </div>
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
        {product && (
          <PackageCard
            paymentIndex={paymentIndex}
            item={item}
            selected
            discountAmount={
              couponSuccess && couponSuccess.valid
                ? couponSuccess.finalAmount
                : undefined
            }
          />
        )}
      </div>
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        FORMAS DE PAGAMENTO
      </Text>
      <section className="paymentMethods">
        <PixCard
          userId={userId}
          packageId={item.id}
          paymentMethodName={item.paymentMethods[0].name}
          // price={item && item.paymentMethods[0].price}
          price={
            couponSuccess
              ? couponSuccess.valid
                ? couponSuccess.finalAmount
                : item && item.paymentMethods[0].price
              : item && item.paymentMethods[0].price
          }
          setError={setError}
          setBlockId={setBlockId}
        />
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
      {!logged && <LoginModal />}
    </ProductInnerPage>
  );
};

export default PaymentPage;
