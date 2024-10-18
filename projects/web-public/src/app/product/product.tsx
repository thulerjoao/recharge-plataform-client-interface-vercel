"use client";

import Text from "@4miga/design-system/components/Text";
import Input from "@4miga/design-system/components/input";
import { ProductContainer } from "./styles/product.style";
import PackageCard from "./utils/components/packageCard/card";
import BigoCard from "./utils/temp/bigoCard.svg";

const ProductPage = () => {
  return (
    <ProductContainer>
      <Text align="center" fontType="REGULAR_SEMI_BOLD">
        INSIRA SEU ID DE USUÁRIO
      </Text>
      <Input
        placeholder="Insira o ID de usuário"
        margin="16px 0 0 0"
        height={48}
      />
      <Text margin="32px 0 0 0" align="center" fontType="REGULAR_SEMI_BOLD">
        SELECIONE O PACOTE PARA RECARGA
      </Text>
      <section className="cardsContainer">
        <PackageCard
          bestOffer
          title="BIGO 30"
          image={<BigoCard />}
          price={3.9}
        />
        <PackageCard
          bestOffer
          title="BIGO 100"
          image={<BigoCard />}
          price={6.9}
        />
        <PackageCard title="BIGO 300" image={<BigoCard />} price={9.9} />
        <PackageCard title="BIGO 500" image={<BigoCard />} price={14.9} />
        <PackageCard title="BIGO 1000" image={<BigoCard />} price={24.9} />
        <PackageCard
          bestOffer
          title="BIGO 5000"
          image={<BigoCard />}
          price={89.9}
        />
      </section>
    </ProductContainer>
  );
};

export default ProductPage;
