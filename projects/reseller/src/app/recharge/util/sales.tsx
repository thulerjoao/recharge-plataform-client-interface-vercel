import { useDevice } from "context/deviceContext";
import { ResellerContainer } from "./style";
import HeaderEnviroment from "public/components/headerEnviroment";
import DefaultHeader from "public/components/defaultHeader";
import Text from "@4miga/design-system/components/Text";
import GameCard from "public/cards/gameCard/card";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import Card3 from "../common/temp/Card3.png";
import Card4 from "../common/temp/Card4.png";
import Card5 from "../common/temp/Card5.png";
import Card6 from "../common/temp/Card6.png";
import { useRouter } from "next/navigation";

const Reseller = () => {
  const { device } = useDevice();
  const route = useRouter();

  return (
    <ResellerContainer>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="RECARGA" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && <DefaultHeader backWard title="RECARGA" />}
      <div className="mainTitle">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          Selecione o jogo que deseja fazer uma nova recarga
        </Text>
      </div>
      <main className="cardsContainer">
        <div
          className="cardEnviroment"
          onClick={() => route.push("/recharge/bigo")}
        >
          <GameCard image={Card1} name="Bigo Live" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/recharge/bigo")}
        >
          <GameCard image={Card2} name="Farlight 84" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/recharge/bigo")}
        >
          <GameCard image={Card3} name="8 Ball Pool" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/recharge/bigo")}
        >
          <GameCard image={Card4} name="Free Fire" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/recharge/bigo")}
        >
          <GameCard image={Card5} name="Pubg Mobile" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/recharge/bigo")}
        >
          <GameCard image={Card6} name="Mobile Legends" />
        </div>
      </main>
    </ResellerContainer>
  );
};

export default Reseller;
