"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useProducts } from "contexts/products/ProductsProvider";
import React, { useEffect, useState } from "react";
import { PackageType } from "types/productTypes";
import { ProductInnerPage } from "./style";
import PixCard from "public/components/payment/pixCard/pixCard";
import PackageCard from "public/cards/packageCard/card";

type Props = {
  slug: string;
};

const PaymentPage = ({ slug }: Props) => {
  const products = useProducts();
  const product = products[0];
  const initialUserId = sessionStorage.getItem("userId");

  const item =
    product && product.packages.find((item: PackageType) => item.id === slug);
  const [userId, setUserId] = useState<string>(
    initialUserId ? initialUserId : "",
  );
  const [paymentIndex, setPaymentIndex] = useState<number>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const paymentIndex = sessionStorage.getItem("paymentMethod");
    setPaymentIndex(+paymentIndex);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setError("");
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
        value={userId && userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        PACOTE PARA RECARGA
      </Text>
      <div className="cardEnviroment">
        {product && item && (
          <PackageCard paymentIndex={paymentIndex} item={item} selected />
        )}
      </div>
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        FORMAS DE PAGAMENTO
      </Text>
      <section className="paymentMethods">
        {item && (
          <PixCard
            userId={userId}
            packageId={item.id}
            paymentMethodName={item.paymentMethods[0].name}
            price={item && item.paymentMethods[0].price}
            setError={setError}
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
    </ProductInnerPage>
  );
};

export default PaymentPage;
