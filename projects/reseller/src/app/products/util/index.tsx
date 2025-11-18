"use client";

import Text from "@4miga/design-system/components/Text";

import GameCard from "public/cards/gameCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import InvisibleCards from "./invisivleCards";
import { ProductsPageContainer } from "./style";
import { useRouter } from "next/navigation";
import { formatString } from "utils/formatString";
import { useProducts } from "context/products";
import { useAuth } from "context/auth";

const ProductsPage = () => {
  const { products } = useProducts();
  const { user } = useAuth();
  const route = useRouter();

  const handleProductClick = (path: string) => {
    const res = formatString(path);
    route.push(`/products/${res}`);
  };

  console.log("user", user);

  return (
    <ProductsPageContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader title="PRODUTOS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          PRODUTOS
        </Text>
      </div>
      <div className="mainTitle">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          CONFIGURE SEUS PRODUTOS
        </Text>
      </div>
      <main className="cardsContainer">
        {products?.map((product) => {
          return (
            <div
              key={product.id}
              className="cardEnviroment"
              onClick={() => handleProductClick(product.id)}
            >
              <GameCard product={product} />
            </div>
          );
        })}
        {InvisibleCards(products)}
      </main>
    </ProductsPageContainer>
  );
};

export default ProductsPage;
