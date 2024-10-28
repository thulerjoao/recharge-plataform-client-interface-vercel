"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import { useRouter } from "next/navigation";
import PackageCard from "./common/components/packageCard/card";
import PaymentCard from "./common/components/paymentCard/card";
import BigoCard from "./common/temp/bigoCard.svg";
import { ProductContainer } from "./styles/product.style";

const ProductPage = () => {
  const route = useRouter();
  return (
    <ProductContainer>
      <Text align="center" fontName="REGULAR_SEMI_BOLD">
        INSIRA SEU ID DE USUÁRIO
      </Text>
      <Input
        placeholder="Insira o ID de usuário"
        margin="16px 0 0 0"
        height={48}
      />
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        SELECIONE O PACOTE PARA RECARGA
      </Text>
      <section className="cardsContainer">
        <div className="cardEnviroment">
          <PackageCard
            selected
            bestOffer
            title="BIGO 30"
            image={<BigoCard />}
            price={3.9}
          />
        </div>
        <div className="cardEnviroment">
          <PackageCard
            bestOffer
            title="BIGO 100"
            image={<BigoCard />}
            price={6.9}
          />
        </div>
        <div className="cardEnviroment">
          <PackageCard title="BIGO 300" image={<BigoCard />} price={9.9} />
        </div>
        <div className="cardEnviroment">
          <PackageCard title="BIGO 500" image={<BigoCard />} price={14.9} />
        </div>
        <div className="cardEnviroment">
          <PackageCard title="BIGO 1000" image={<BigoCard />} price={24.9} />
        </div>
        <div className="cardEnviroment">
          <PackageCard
            bestOffer
            title="BIGO 5000"
            image={<BigoCard />}
            price={89.9}
          />
        </div>
      </section>
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        SELECIONE A FORMA DE PAGAMENTO
      </Text>
      <section className="paymentMethodsContainer">
        <PaymentCard selected method="pix" price={3.9} />
        <PaymentCard method="mercado pago" price={3.95} />
        <PaymentCard method="picpay" price={3.95} />
        <PaymentCard method="paypal" price={3.95} />
        <PaymentCard method="boleto" price={3.95} />
        <PaymentCard method="transferencia" price={3.95} />
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
