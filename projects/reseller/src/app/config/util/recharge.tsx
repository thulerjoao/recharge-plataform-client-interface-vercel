import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useDevice } from "context/deviceContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Camera from "../common/icons/Camera.svg";
import Close from "../common/icons/Close.svg";
import Email from "../common/icons/Email.svg";
import Facebook from "../common/icons/Facebook.svg";
import Instagram from "../common/icons/Instagram.svg";
import Tiktok from "../common/icons/TikTok.svg";
import Wpp from "../common/icons/Wpp.svg";
import Logo from "../common/temp/Logo.png";
import MainBanner from "../common/temp/MainBanner.png";
import SecondaryBanner from "../common/temp/SeconderyBanner.png";
import { SettingsPageContainer } from "./style";

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
      <section className="secondContainer">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          BANNER SUPERIOR PÁGINA HOME
        </Text>
        <Text margin="16px 0 0 0" align="center" fontName="TINY_MEDIUM">
          A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma resolução
          mínima de 1280 x 720 e uma proporção de 16:9
        </Text>
        <span className="mainBannerImage">
          <Image src={MainBanner} alt="banner superior" />
        </span>
        <Text align="center" margin="16px 0 0 0" fontName="SMALL_MEDIUM">
          3/5
        </Text>
        <div className="buttons">
          <Button
            style={{ color: "white" }}
            isNotSelected
            height={32}
            width={183}
            rounded
            leftElement={<Close />}
            title="Remover imagem"
          />
          <Button
            height={32}
            width={181}
            rounded
            leftElement={<Camera />}
            title="Remover imagem"
          />
        </div>
      </section>
      <section className="thirdContainer">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          BANNER INFERIOR PÁGINA HOME
        </Text>
        <Text margin="16px 0 0 0" align="center" fontName="TINY_MEDIUM">
          A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma resolução
          mínima de 1280 x 540 e uma proporção de 21:9
        </Text>
        <span className="mainBannerImage">
          <Image src={SecondaryBanner} alt="banner superior" />
        </span>
        <div className="buttons">
          <Button
            style={{ color: "white" }}
            isNotSelected
            height={32}
            width={183}
            rounded
            leftElement={<Close />}
            title="Remover imagem"
          />
          <Button
            height={32}
            width={181}
            rounded
            leftElement={<Camera />}
            title="Remover imagem"
          />
        </div>
      </section>
      <section className="bottomContainer">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          LOGO
        </Text>
        <Text margin="16px 0 0 0" align="center" fontName="TINY_MEDIUM">
          O logo deve estar no formato .png e ter uma resolução mínima de 720 x
          480
        </Text>
        <span className="mainBannerImage">
          <Image src={Logo} alt="banner superior" />
        </span>
        <div className="buttons">
          <Button
            style={{ color: "white" }}
            isNotSelected
            height={32}
            width={183}
            rounded
            leftElement={<Close />}
            title="Remover imagem"
          />
          <Button
            height={32}
            width={181}
            rounded
            leftElement={<Camera />}
            title="Remover imagem"
          />
        </div>
      </section>
    </SettingsPageContainer>
  );
};

export default Settings;
