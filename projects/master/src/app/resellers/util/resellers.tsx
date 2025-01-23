import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import BottomCard from "../common/components/bottomCard";
import Forward from "../common/icons/forward.svg";
import Logo from "../common/icons/Logo.svg";
import Recharge24 from "../common/icons/Recharge24.svg";
import SecondaryForward from "../common/icons/secondaryForward.svg";
import { ResellersContainer } from "./style";

const Reseller = () => {
  const { device } = useDevice();
  const route = useRouter();

  return (
    <ResellersContainer>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="REVENDEDORES" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && <DefaultHeader backWard title="REVENDEDORES" />}
      <main>
        <div className="addReseller">
          <Text align="start" fontName="REGULAR_MEDIUM">
            Adicionar revendedor
          </Text>
          <span>
            <Forward />
          </span>
        </div>
        <div className="bottomContainer">
          <Text align="center" fontName="REGULAR_SEMI_BOLD">
            SEUS REVENDEDORES
          </Text>
          <BottomCard
            margin="8px 0 0 0"
            fontColor={Theme.colors.mainHighlight}
            title_01="Plataforma"
            title_02="Responsável"
          />
          <BottomCard
            cursorPointer
            backgroundColor={Theme.colors.maindark}
            title_01="4miga Games"
            title_02="Carlos Castro Júnior"
            logo_01={<Logo />}
            logo_02={<SecondaryForward />}
          />
          <BottomCard
            cursorPointer
            margin="16px 0 0 0"
            backgroundColor={Theme.colors.maindark}
            title_01="Recargas 24h"
            title_02="Maria Santos Silva"
            logo_01={<Recharge24 />}
            logo_02={
              <SecondaryForward
                styled={{ paddingLeft: "32px", backgroundColor: "pink" }}
              />
            }
          />
        </div>
      </main>
    </ResellersContainer>
  );
};

export default Reseller;
