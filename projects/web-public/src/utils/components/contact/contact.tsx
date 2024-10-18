import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Email from "../../icons/Email.svg";
import Facebook from "../../icons/Facebook.svg";
import Instagram from "../../icons/Instagram.svg";
import TikTok from "../../icons/TikTok.svg";
import Wpp from "../../icons/Wpp.svg";
import { ContactContainer } from "./style";

const Contact = () => {
  return (
    <ContactContainer>
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
          <Text align="center" fontType="REGULAR" margin="0 0 0 8px">
            (11) 9 9999-9999
          </Text>
        </span>
        <span>
          <figure>
            <Email />
          </figure>
          <Text align="center" fontType="REGULAR" margin="0 0 0 8px">
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
    </ContactContainer>
  );
};

export default Contact;
