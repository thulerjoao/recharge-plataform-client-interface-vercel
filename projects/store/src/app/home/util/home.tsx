"use client";

import Text from "@4miga/design-system/components/Text";
import Carousel from "app/home/common/components/carousel/carousel";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import GameCard from "../../../public/cards/gameCard/card";
import Lines from "../common/components/lines/lines";
// import Card1 from "../common/temp/Card1.png";
// import Card2 from "../common/temp/Card2.png";
// import Card3 from "../common/temp/Card3.png";
// import Card4 from "../common/temp/Card4.png";
// import Card5 from "../common/temp/Card5.png";
// import Card6 from "../common/temp/Card6.png";
import { useProduct } from "contexts/product";
import mainBanner from "../common/temp/mainBanner.png";
import { HomeContainer } from "./style";

const Home = () => {
  const { products } = useProduct();

  return (
    <HomeContainer>
      <Carousel imagesList={[mainBanner, mainBanner, mainBanner]} />
      <Lines />
      <main>
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          margin="72px 0px 0px 0px"
        >
          RECARREGUE AGORA!
        </Text>
        <Text
          tag="h2"
          align="center"
          fontName="REGULAR"
          margin="8px 0px 0px 0px"
        >
          Texto de exemplo
        </Text>
        <section className="cardsContainer">
          {products &&
            products.map((product) => (
              <div key={product.id} className="cardEnviroment">
                <GameCard product={product} />
              </div>
            ))}
        </section>
      </main>
      <SecurityAdvertise />
      <BottomOffer />
    </HomeContainer>
  );
};

export default Home;
