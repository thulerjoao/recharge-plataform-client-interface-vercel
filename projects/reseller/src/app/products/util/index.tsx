"use client";

import Text from "@4miga/design-system/components/Text";
import { useProducts } from "context/products/ProductsProvider";
import GameCard from "public/cards/gameCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import InvisibleCards from "./invisivleCards";
import { ProductsPageContainer } from "./style";

const ProductsPage = () => {
  const products = useProducts();
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
        {products &&
          products.map((product) => {
            return (
              <div key={product.id} className="cardEnviroment">
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
