"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import { useProduct } from "contexts/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PackageCard from "../../../public/cards/packageCard/card";
import PaymentCard from "../../../public/cards/paymentCard/card";
// import BigoCard from "../common/temp/bigoCard.svg";
import { Theme } from "@4miga/design-system/theme/theme";
import { ProductContainer } from "./style";

type Props = {
  params: {
    slug: string;
  };
};

const ProductPage = ({ params }: Props) => {
  const id = params.slug;
  const { products } = useProduct();
  const product = products.find((product) => product.id === id);
  console.log(product);

  const [selected, setSelected] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<number>(1);

  const route = useRouter();

  return (
    <ProductContainer>
      <Text tag="h2" align="center" fontName="REGULAR_SEMI_BOLD">
        INSIRA SEU ID DE USUÁRIO
      </Text>
      <Input
        placeholder="Insira o ID de usuário"
        margin="16px 0 0 0"
        height={48}
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
            Não há pacotes disponíveis
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
        <div className="paymentEnviroment" onClick={() => setPaymentMethod(1)}>
          <PaymentCard
            selected={paymentMethod === 1}
            method="pix"
            price={3.9}
          />
        </div>
        <div className="paymentEnviroment" onClick={() => setPaymentMethod(2)}>
          <PaymentCard
            selected={paymentMethod === 2}
            method="mercado pago"
            price={3.95}
          />
        </div>
        <div className="paymentEnviroment" onClick={() => setPaymentMethod(3)}>
          <PaymentCard
            selected={paymentMethod === 3}
            method="picpay"
            price={3.95}
          />
        </div>
        <div className="paymentEnviroment" onClick={() => setPaymentMethod(4)}>
          <PaymentCard
            selected={paymentMethod === 4}
            method="paypal"
            price={3.95}
          />
        </div>
        <div className="paymentEnviroment" onClick={() => setPaymentMethod(5)}>
          <PaymentCard
            selected={paymentMethod === 5}
            method="boleto"
            price={3.95}
          />
        </div>
        <div className="paymentEnviroment" onClick={() => setPaymentMethod(6)}>
          <PaymentCard
            selected={paymentMethod === 6}
            method="transferencia"
            price={3.95}
          />
        </div>
      </section>
      <Button
        onClick={() => route.push("/products/bigo300")}
        margin="32px 0 80px 0"
        width={185}
        rounded
        height={40}
        title="Compre Agora"
      />
    </ProductContainer>
  );
};

export default ProductPage;
