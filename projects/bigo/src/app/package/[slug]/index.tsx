"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import PixCard from "public/components/payment/pixCard/pixCard";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import LoginModal from "public/components/loginModal";
import React, { useEffect, useState } from "react";
import { PackageType } from "types/productTypes";
import { formatString } from "utils/formatString";
import PackageCard from "../../../public/cards/packageCard/card";
import { ProductInnerPage } from "./style";

type Props = {
  slug: string;
};

const PaymentPage = ({ slug }: Props) => {
  const products = useProducts();
  const product = products[0];

  const item =
    product &&
    product.packages.find(
      (item: PackageType) => formatString(item.id) === slug,
    );
  const [userId, setUserId] = useState<string>("");
  const [paymentIndex, setPaymentIndex] = useState<number>();
  const [error, setError] = useState<string>();
  const { logged } = useAuth();

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
      {!logged && <LoginModal />}
    </ProductInnerPage>
  );
};

export default PaymentPage;
