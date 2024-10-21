"use client";

import Text from "@4miga/design-system/components/Text";
import Footer from "utils/components/footer/footer";
import Header from "utils/components/header/header";
import SecurityAdvertise from "utils/components/securityAdvertise/securityAdvertise";
import Contact from "../../utils/components/contact/contact";
import { HomeContainer } from "./styles/home.style";
import Card from "./common/components/card/card";
import Lines from "./common/components/lines/lines";
import Card1 from "./common/temp/Card1.svg";
import Card2 from "./common/temp/Card2.svg";
import Card3 from "./common/temp/Card3.svg";
import Card4 from "./common/temp/Card4.svg";
import Card5 from "./common/temp/Card5.svg";
import Card6 from "./common/temp/Card6.svg";
import MainBanner from "./common/temp/mainBanner.svg";
import Offer from "./common/temp/Offer.svg";

const Home = () => {
  return (
    <HomeContainer>
      <Header />
      <Lines />
      <div className="topBanner">
        <MainBanner />
      </div>
      <main>
        <Text
          tag="h1"
          align="center"
          fontType="LARGE_SEMI_BOLD"
          margin="72px 0px 0px 0px"
        >
          RECARREGUE AGORA!
        </Text>
        <Text
          tag="h2"
          align="center"
          fontType="REGULAR"
          margin="8px 0px 0px 0px"
        >
          Texto de exemplo
        </Text>
        <section className="cardsContainer">
          <Card image={<Card1 />} name="Bigo Live" />
          <Card image={<Card2 />} name="Farlight 84" />
          <Card image={<Card3 />} name="8 Ball Pool" />
          <Card image={<Card4 />} name="Free Fire" />
          <Card image={<Card5 />} name="Pubg Mobile" />
          <Card image={<Card6 />} name="Mobile Legends" />
        </section>
      </main>
      <SecurityAdvertise />
      <Text
        tag="h2"
        align="center"
        fontType="LARGE_SEMI_BOLD"
        margin="56px 0 24px 0"
      >
        OFERTA X
      </Text>
      <figure>
        <Offer />
      </figure>
      <Contact />
      <Footer />
    </HomeContainer>
  );
};

export default Home;
