"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import CreditcardCard from "app/common/payment/creditcardCard/creditcardCard";
import PackageCard from "../common/components/packageCard/card";
import BigoCard from "../common/temp/bigoCard.svg";
import { ProductInnerPage } from "./style";
import PixCard from "app/common/payment/pixCard/pixCard";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <ProductInnerPage>
      <Text align="center" fontName="REGULAR_SEMI_BOLD">
        ID DE USUÁRIO
      </Text>
      <Input
        placeholder="Insira seu ID de usuário"
        margin="16px 0 0 0"
        height={48}
      />
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        PACOTE PARA RECARGA
      </Text>
      <div className="cardEnviroment">
        <PackageCard
          selected
          bestOffer
          title="BIGO 300"
          image={<BigoCard />}
          price={9.9}
        />
      </div>
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        FORMAS DE PAGAMENTO
      </Text>
      <section className="paymentMethods">
        <PixCard />
        <CreditcardCard />
      </section>
    </ProductInnerPage>
  );
};

export default Page;
