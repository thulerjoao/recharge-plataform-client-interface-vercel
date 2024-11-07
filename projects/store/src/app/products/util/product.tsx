"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PackageCard from "../../../public/cards/packageCard/card";
import PaymentCard from "../../../public/cards/paymentCard/card";
import BigoCard from "../common/temp/bigoCard.svg";
import { ProductContainer } from "./style";

const ProductPage = () => {
  const [selected, setSelected] = useState<number>(1);
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
        <div className="cardEnviroment" onClick={() => setSelected(1)}>
          <PackageCard
            selected={selected === 1}
            bestOffer
            title="BIGO 30"
            image={<BigoCard />}
            price={3.9}
          />
        </div>
        <div className="cardEnviroment" onClick={() => setSelected(2)}>
          <PackageCard
            selected={selected === 2}
            bestOffer
            title="BIGO 100"
            image={<BigoCard />}
            price={6.9}
          />
        </div>
        <div className="cardEnviroment" onClick={() => setSelected(3)}>
          <PackageCard
            selected={selected === 3}
            title="BIGO 300"
            image={<BigoCard />}
            price={9.9}
          />
        </div>
        <div className="cardEnviroment" onClick={() => setSelected(4)}>
          <PackageCard
            selected={selected === 4}
            title="BIGO 500"
            image={<BigoCard />}
            price={14.9}
          />
        </div>
        <div className="cardEnviroment" onClick={() => setSelected(5)}>
          <PackageCard
            selected={selected === 5}
            title="BIGO 1000"
            image={<BigoCard />}
            price={24.9}
          />
        </div>
        <div className="cardEnviroment" onClick={() => setSelected(6)}>
          <PackageCard
            selected={selected === 6}
            bestOffer
            title="BIGO 5000"
            image={<BigoCard />}
            price={89.9}
          />
        </div>
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
