"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import { useProduct } from "contexts/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PackageCard from "../../../public/cards/packageCard/card";
import PaymentCard from "../../../public/cards/paymentCard/card";
// import BigoCard from "../common/temp/bigoCard.svg";
import { Theme } from "@4miga/design-system/theme/theme";

import { invisibleCardsCalc } from "utils/invisibleCardsCalc";

import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import { ProductContainer } from "./style";

type Props = {
  products: ProductType[];
  product: ProductType;
};

const ProductPage = ({ products, product }: Props) => {
  const route = useRouter();
  const { setCurrentProduct } = useProduct();

  const [selected, setSelected] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const currentePackage: PackageType = product && product.packages[selected];
  const [userId, setUserId] = useState<string>("");
  console.log(userId);

  useEffect(() => {
    setCurrentProduct(product);
  }, [product, setCurrentProduct]);

  const handleOnClick = () => {
    const selectedPayment = currentePackage.paymentMethods[paymentMethod].name;
    sessionStorage.setItem("paymentMethod", selectedPayment);
    sessionStorage.setItem("userId", userId);
    route.push(
      `/product/${formatString(product.name)}/${formatString(currentePackage.id)}`,
    );
  };

  return (
    <ProductContainer>
      <Text tag="h2" align="center" fontName="REGULAR_SEMI_BOLD">
        INSIRA SEU ID DE USUÁRIO
      </Text>
      <Input
        placeholder="Insira o ID de usuário"
        margin="16px 0 0 0"
        height={48}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Text
        tag="h2"
        margin="32px 0 0 0"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
      >
        SELECIONE O PACOTE PARA RECARGA
      </Text>
      <section className="cardsContainer">
        {!product ? (
          <Text
            color={Theme.colors.pending}
            align="center"
            fontName="SMALL"
            margin="32px 0 48px 0"
          >
            Carregando pacotes...
          </Text>
        ) : (
          product.packages.map((item, index) => (
            <div
              key={index}
              className="cardEnviroment"
              onClick={() => setSelected(index)}
            >
              <PackageCard item={item} selected={selected === index} />
            </div>
          ))
        )}
        {invisibleCardsCalc(product.packages) === 1 && (
          <div className="cardEnviroment">
            <span className="invisibleCard" />
          </div>
        )}
        {invisibleCardsCalc(product.packages) === 2 && (
          <div className="cardEnviroment">
            <span className="invisibleCard" />
          </div>
        )}
        {invisibleCardsCalc(product.packages) === 2 && (
          <div className="cardEnviroment">
            <span className="invisibleCard" />
          </div>
        )}
      </section>
      <Text
        tag="h2"
        margin="32px 0 0 0"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
      >
        SELECIONE A FORMA DE PAGAMENTO
      </Text>
      <section className="paymentMethodsContainer">
        {!product ? (
          <Text
            color={Theme.colors.pending}
            align="center"
            fontName="SMALL"
            margin="48px 0 20px 0"
          >
            Carregando pagamento...
          </Text>
        ) : (
          currentePackage.paymentMethods.map((item, index) => (
            <div
              key={index}
              className="paymentEnviroment"
              onClick={() => setPaymentMethod(index)}
            >
              <PaymentCard
                selected={paymentMethod === index}
                method={item.name}
                price={currentePackage.amountCredits}
              />
            </div>
          ))
        )}
      </section>
      <Button
        onClick={() => handleOnClick()}
        margin="32px 0 80px 0"
        width={185}
        rounded
        height={40}
        title="Compre Agora"
        disabled={!userId}
        isNotSelected={!userId}
      />
    </ProductContainer>
  );
};

export default ProductPage;
