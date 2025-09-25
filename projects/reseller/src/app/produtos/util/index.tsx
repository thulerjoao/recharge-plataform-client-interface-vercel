"use client";

import Text from "@4miga/design-system/components/Text";
import { useProducts } from "context/products/ProductsProvider";
import GameCard from "public/cards/gameCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import InvisibleCards from "./invisivleCards";
import { ProductsPageContainer } from "./style";
import { useRouter } from "next/navigation";
import { formatString } from "utils/formatString";

const ProductsPage = () => {
  const { products } = useProducts();
  const route = useRouter();
  console.log("products", products);

  const handleProductClick = (path: string) => {
    const res = formatString(path);
    route.push(`/produtos/${res}`);
  };

  console.log(products);
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
