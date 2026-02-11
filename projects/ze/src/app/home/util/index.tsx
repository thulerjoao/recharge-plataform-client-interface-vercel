"use client";

import Text from "@4miga/design-system/components/Text";
import { useProducts } from "contexts/products/ProductsProvider";
import { useStore } from "contexts/store/StoreProvider";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import Carousel from "public/components/carousel/carousel";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import GameCard from "public/cards/gameCard/card";
import InvisibleCards from "./invisibleCards";
import { HomeContainer } from "./style";

const Home = () => {
  const { products } = useProducts();
  const { store } = useStore();
  const bannerList: string[] = store?.bannersUrl || [];

  return (
    <HomeContainer>
      <Carousel imagesList={bannerList} />
      <main>
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          margin="72px 0px 0px 0px"
        >
          RECARREGUE AGORA!
        </Text>
        <section className="cardsContainer">
          {products &&
            products.map((product) => (
              <div key={product.id} className="cardEnviroment">
                <GameCard product={product} />
              </div>
            ))}
          {InvisibleCards(products || [])}
        </section>
      </main>
      <SecurityAdvertise />
      <BottomOffer />
    </HomeContainer>
  );
};

export default Home;
