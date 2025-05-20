import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import GameCard from "public/cards/gameCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { RechargeContainer } from "./style";

const Reseller = () => {
  const route = useRouter();

  return (
    <RechargeContainer>
      <div className="desktop tablet">
        <HeaderEnviroment>
          <DefaultHeader backWard title="RECARGA" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="RECARGA" />
      </div>
      <div className="mainTitle">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          Selecione o jogo que deseja fazer uma nova recarga
        </Text>
      </div>
      <main className="cardsContainer">
        {/* <div
          className="cardEnviroment"
          onClick={() => route.push("/recharge/bigo")}
        >
          <GameCard product={{}} />
        </div> */}
      </main>

      <div className="fixRecharge">
        <span
          className="fixText"
          onClick={() => route.push(`/recharge/fix/${8946783941}`)}
        >
          <Text nowrap underline align="end" fontName="REGULAR">
            Corrigir recarga não concluída
          </Text>
          <span className="ball">
            <Text
              align="center"
              color={Theme.colors.maindark}
              fontName="SMALL_SEMI_BOLD"
            >
              3
            </Text>
          </span>
        </span>
      </div>
    </RechargeContainer>
  );
};

export default Reseller;
