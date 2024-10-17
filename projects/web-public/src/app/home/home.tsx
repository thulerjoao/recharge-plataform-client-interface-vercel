"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Footer from "utils/components/footer/footer";
import Header from "utils/components/header/header";
import Card from "./utils/components/card/card";
import Contact from "./utils/components/contact/contact";
import Lines from "./utils/components/lines/lines";
import SecurityAdvertise from "./utils/components/securityAdvertise/securityAdvertise";
import Card1 from "./utils/temp/Card1.svg";
import Card2 from "./utils/temp/Card2.svg";
import Card3 from "./utils/temp/Card3.svg";
import Card4 from "./utils/temp/Card4.svg";
import Card5 from "./utils/temp/Card5.svg";
import Card6 from "./utils/temp/Card6.svg";
import MainBanner from "./utils/temp/mainBanner.svg";
import Offer from "./utils/temp/Offer.svg";
import { HomeContainer } from "./styles/home.style";

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
          color={Theme.colors.mainlight}
          fontType="LARGE_SEMI_BOLD"
          margin="72px 0px 0px 0px"
        >
          RECARREGUE AGORA!
        </Text>
        <Text
          tag="h2"
          align="center"
          color={Theme.colors.mainlight}
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
        color={Theme.colors.mainlight}
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
