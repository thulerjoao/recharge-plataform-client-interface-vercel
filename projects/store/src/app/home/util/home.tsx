"use client";

import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import Card from "../common/components/card/card";
import Lines from "../common/components/lines/lines";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import Card3 from "../common/temp/Card3.png";
import Card4 from "../common/temp/Card4.png";
import Card5 from "../common/temp/Card5.png";
import Card6 from "../common/temp/Card6.png";
import mainBanner from "../common/temp/mainBanner.png";
import { HomeContainer } from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <Image className="mainBanner" src={mainBanner} alt="main banner" />
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
          <div className="cardEnviroment">
            <Card image={Card1} name="Bigo Live" />
          </div>
          <div className="cardEnviroment">
            <Card image={Card2} name="Farlight 84" />
          </div>
          <div className="cardEnviroment">
            <Card image={Card3} name="8 Ball Pool" />
          </div>
          <div className="cardEnviroment">
            <Card image={Card4} name="Free Fire" />
          </div>
          <div className="cardEnviroment">
            <Card image={Card5} name="Pubg Mobile" />
          </div>
          <div className="cardEnviroment">
            <Card image={Card6} name="Mobile Legends" />
          </div>
        </section>
      </main>
      <SecurityAdvertise />
      <BottomOffer />
    </HomeContainer>
  );
};

export default Home;
