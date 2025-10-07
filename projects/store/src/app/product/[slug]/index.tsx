"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import { useRouter } from "next/navigation";
import LoginModal from "public/components/loginModal";
import { useEffect, useRef, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import { scrollToTop } from "utils/scrollToTopFunction";
import PackageCard from "../../../public/cards/packageCard/card";
import PaymentCard from "../../../public/cards/paymentCard/card";
import InvisibleCards from "./invisivleCards";
import { ProductContainer } from "./style";

type Props = {
  slug: string;
};

const ProductPage = ({ slug }: Props) => {
  const route = useRouter();
  const { products } = useProducts();
  const product = products.find(
    (product: ProductType) => formatString(product.name) === slug,
  );
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<number>(0);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const currentePackage: PackageType = product && product.packages[selected];
  const [userId, setUserId] = useState<string>("");
  const { logged } = useAuth();

  console.log("product", products);

  useEffect(() => {
    if (logged && clicked) handleOnClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged, clicked]);

  useEffect(() => {
    sessionStorage.removeItem("qrCode");
    sessionStorage.removeItem("copyAndPaste");
    sessionStorage.removeItem("orderId");
  }, []);

  useEffect(() => {
    setClicked(false);
  }, [userId]);

  const handleOnClick = () => {
    setClicked(true);
    if (!userId) {
      scrollToTop();
      setTimeout(() => {
        userIdInputRef.current?.focus();
      }, 500);
      return;
    }
    if (!logged) {
      return setLoginModal(true);
    }
    const selectedPayment = currentePackage.paymentMethods[paymentMethod].name;
    sessionStorage.setItem("paymentMethod", paymentMethod.toString());
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
        ref={userIdInputRef}
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
                price={item.price}
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
      />
      {!userId && clicked && (
        <Text
          color={Theme.colors.pending}
          align="center"
          fontName="SMALL"
          margin="-64px 0 46px 0"
        >
          Insira o ID de usuário
        </Text>
      )}
      {loginModal && (
        <LoginModal openInNewAccount={false} setLoginModal={setLoginModal} />
      )}
    </ProductContainer>
  );
};

export default ProductPage;
