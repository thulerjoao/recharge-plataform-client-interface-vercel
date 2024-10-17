"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Header from "utils/components/header/header";
import Card from "../components/card/card";
import Lines from "../components/lines/lines";
import Card1 from "./images/Card1.svg";
import Card2 from "./images/Card2.svg";
import Card3 from "./images/Card3.svg";
import Card4 from "./images/Card4.svg";
import Card5 from "./images/Card5.svg";
import Card6 from "./images/Card6.svg";
import Email from "./images/Email.svg";
import Facebook from "./images/Facebook.svg";
import Instagram from "./images/Instagram.svg";
import Kart from "./images/Kart.svg";
import Locker from "./images/Locker.svg";
import MainBanner from "./images/mainBanner.svg";
import Offer from "./images/Offer.svg";
import TikTok from "./images/TikTok.svg";
import Wpp from "./images/Wpp.svg";
import { HomeContainer } from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <Header />
      <Lines />
      <nav>
        <MainBanner />
      </nav>
      <main>
        <Text
          align="center"
          color={Theme.colors.mainlight}
          fontType="LARGE_SEMI_BOLD"
          margin="72px 0px 0px 0px"
        >
          RECARREGUE AGORA!
        </Text>
        <Text
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
        <section className="securityAdvertising">
          <article>
            <Kart />
            <Text
              align="center"
              color={Theme.colors.mainlight}
              fontType="SMALL_MEDIUM"
            >
              Entrega imediata
            </Text>
          </article>
          <article>
            <Locker />
            <Text
              align="center"
              color={Theme.colors.mainlight}
              fontType="SMALL_MEDIUM"
            >
              Compra Segura
            </Text>
          </article>
        </section>
        <Text
          align="center"
          color={Theme.colors.mainlight}
          fontType="LARGE_SEMI_BOLD"
          margin="56px 0 24px 0"
        >
          OFERTA X
        </Text>
        <Offer />
      </main>
      <section className="contact">
        <div>
          <Text
            align="center"
            color={Theme.colors.mainHighlight}
            fontType="REGULAR_MEDIUM"
          >
            Central de Atendimento
          </Text>
          <span>
            <figure>
              <Wpp />
            </figure>
            <Text
              align="center"
              color={Theme.colors.mainlight}
              fontType="REGULAR"
              margin="0 0 0 8px"
            >
              (11) 9 9999-9999
            </Text>
          </span>
          <span>
            <figure>
              <Email />
            </figure>
            <Text
              align="center"
              color={Theme.colors.mainlight}
              fontType="REGULAR"
              margin="0 0 0 8px"
            >
              contato@4miga.com
            </Text>
          </span>
        </div>
        <div>
          <Text
            align="center"
            color={Theme.colors.mainHighlight}
            fontType="REGULAR_MEDIUM"
          >
            Nossas Redes Sociais
          </Text>
          <span>
            <figure className="socialMedia">
              <Instagram />
            </figure>
            <figure className="socialMedia">
              <Facebook />
            </figure>
            <figure className="socialMedia">
              <TikTok />
            </figure>
          </span>
        </div>
      </section>
    </HomeContainer>
  );
};

export default Home;
