"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import PixCard from "app/common/payment/pixCard/pixCard";
import { useProducts } from "contexts/products/ProductsProvider";
import React, { useEffect, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import PackageCard from "../../../../public/cards/packageCard/card";
import { ProductInnerPage } from "./style";
import Button from "@4miga/design-system/components/button";

type Props = {
  id: string;
  slug: string;
};

const PaymentPage = ({ id, slug }: Props) => {
  const products = useProducts();
  const product = products.find(
    (item: ProductType) => formatString(item.name) === slug,
  );
  const item =
    product &&
    product.packages.find((item: PackageType) => formatString(item.id) === id);
  const [userId, setUserId] = useState<string>("");
  const [paymentIndex, setPaymentIndex] = useState<number>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const paymentIndex = sessionStorage.getItem("paymentMethod");
    setPaymentIndex(+paymentIndex);
    const memoryUserId = sessionStorage.getItem("userId");
    setUserId(memoryUserId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setError("");
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

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
        onChange={(e) => setUserId(e.target.value)}
      />
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        PACOTE PARA RECARGA
      </Text>
      <div className="cardEnviroment">
        {product && (
          <PackageCard paymentIndex={paymentIndex} item={item} selected />
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
          price={item && item.paymentMethods[0].price}
          setError={setError}
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
    </ProductInnerPage>
  );
};

export default PaymentPage;
