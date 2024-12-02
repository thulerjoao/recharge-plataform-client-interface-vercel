import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useDevice } from "context/deviceContext";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Email from "../common/icons/Email.svg";
import Facebook from "../common/icons/Facebook.svg";
import Instagram from "../common/icons/Instagram.svg";
import Tiktok from "../common/icons/TikTok.svg";
import Wpp from "../common/icons/Wpp.svg";
import { SettingsPageContainer } from "./style";
import Button from "@4miga/design-system/components/button";

const Settings = () => {
  const { device } = useDevice();
  const route = useRouter();

  return (
    <SettingsPageContainer>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAÇÕES" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && <DefaultHeader backWard title="CONFIGURAÇÕES" />}
      <section className="topContainer">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          REDES SOCIAIS E CONTATO
        </Text>
        <div className="socialList">
          <span className="cardsEnviroment">
            <Input
              placeholder="@4migagames"
              height={48}
              title="Instagram"
              titleIcon={<Instagram />}
            />
            <Text margin="8px 0 0 16px" fontName="TINY">
              http://instagram.com/4migagames
            </Text>
          </span>
          <span className="cardsEnviroment">
            <Input
              placeholder="@4migagames"
              height={48}
              title="Facebook"
              titleIcon={<Facebook />}
            />
            <Text margin="8px 0 0 16px" fontName="TINY">
              http://facebook.com/4migagames
            </Text>
          </span>
          <span className="cardsEnviroment">
            <Input
              placeholder="@4migagames"
              height={48}
              title="TikTok"
              titleIcon={<Tiktok />}
            />
            <Text margin="8px 0 0 16px" fontName="TINY">
              http://facebook.com/4migagames
            </Text>
          </span>
          <span className="cardsEnviroment">
            <Input
              placeholder="(11) 9 9944-9944"
              height={48}
              title="WhatsApp"
              titleIcon={<Wpp />}
            />
          </span>
          <span className="cardsEnviroment">
            <Input
              placeholder="@contato@4miga.com"
              height={48}
              title="E-mail para suporte"
              titleIcon={<Email />}
            />
          </span>
        </div>
        <Button rounded height={40} width={197} title="Salvar alterações" />
      </section>
    </SettingsPageContainer>
  );
};

export default Settings;
