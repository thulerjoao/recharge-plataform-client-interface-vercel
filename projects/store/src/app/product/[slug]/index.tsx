/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PackageCard from "../../../public/cards/packageCard/card";
import PaymentCard from "../../../public/cards/paymentCard/card";
// import BigoCard from "../common/temp/bigoCard.svg";
import { Theme } from "@4miga/design-system/theme/theme";

import { useAuth } from "contexts/auth";
import LoginModal from "public/components/loginModal";
import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import InvisibleCards from "./invisivleCards";
import { ProductContainer } from "./style";

type Props = {
  product: ProductType;
};

const ProductPage = ({ product }: Props) => {
  const route = useRouter();
  const [selected, setSelected] = useState<number>(0);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const currentePackage: PackageType = product && product.packages[selected];
  const [userId, setUserId] = useState<string>("");
  const { logged } = useAuth();

  useEffect(() => {
    if (logged && clicked) handleOnClick();
  }, [logged, clicked]);

  const handleOnClick = () => {
    setClicked(true);
    if (!logged) {
      return setLoginModal(true);
    }
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
        {InvisibleCards(product.packages)}
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
      {loginModal && (
        <LoginModal openInNewAccount={false} setLoginModal={setLoginModal} />
      )}
    </ProductContainer>
  );
};

export default ProductPage;
