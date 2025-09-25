import Text from "@4miga/design-system/components/Text";
import { useProducts } from "context/products/ProductsProvider";
import GameCard from "public/cards/gameCard/card";
import { ProductType } from "types/productTypes";
import { MainGamesContainer } from "./style";

const MainGames = () => {
  const { products } = useProducts();

  return (
    <MainGamesContainer>
      <section className="list">
        {products &&
          products.map((product: ProductType) => {
            return (
              <div key={product.id} className="newCardContainer">
                <GameCard product={product} />
                <Text
                  margin="16px 0 0 0"
                  align="center"
                  fontName="REGULAR_MEDIUM"
                >
                  {`${product.name} recargas`}
                </Text>
              </div>
            );
          })}
      </section>
    </MainGamesContainer>
  );
};

export default MainGames;
