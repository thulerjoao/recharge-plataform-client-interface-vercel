"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import PixCard from "app/common/payment/pixCard/pixCard";
import { useProduct } from "contexts/product";
import { useState } from "react";
import { PackageType, ProductType } from "types/deviceTypes";
import PackageCard from "../../../../public/cards/packageCard/card";
import { ProductInnerPage } from "./style";

type Props = {
  product: ProductType;
  item: PackageType;
};

const PaymentPage = ({ product, item }: Props) => {
  const { setCurrentProduct } = useProduct();
  setCurrentProduct(product);

  const paymentMethod = sessionStorage.getItem("paymentMethod");
  const memoryUserId = sessionStorage.getItem("userId");
  const [userId, setUserId] = useState<string>(memoryUserId);

  return (
    <ProductInnerPage>
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
        {product && <PackageCard item={item} selected />}
      </div>
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        FORMAS DE PAGAMENTO
      </Text>
      <section className="paymentMethods">
        <PixCard value={item && item.amountCredits} />
        {/* <CreditcardCard /> */}
      </section>
    </ProductInnerPage>
  );
};

export default PaymentPage;
