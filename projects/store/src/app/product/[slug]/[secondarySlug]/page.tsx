"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import PixCard from "app/common/payment/pixCard/pixCard";
import { useProduct } from "contexts/product";
import PackageCard from "../../../../public/cards/packageCard/card";
import { ProductInnerPage } from "./style";

type Props = {
  params: {
    slug: string;
    secondarySlug: string;
  };
};

const Page = ({ params }: Props) => {
  const userId = sessionStorage.getItem("userId");
  const paymentMethod = sessionStorage.getItem("paymentMethod");

  const { products, setCurrentProduct } = useProduct();
  const id = params.secondarySlug;
  const slug = params.slug;
  const currentProduct =
    products && products.find((item) => item.name === slug);
  setCurrentProduct(currentProduct);
  const item =
    currentProduct && currentProduct.packages.find((item) => item.id === id);

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
      />
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
        PACOTE PARA RECARGA
      </Text>
      <div className="cardEnviroment">
        {currentProduct && <PackageCard item={item} selected />}
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

export default Page;
