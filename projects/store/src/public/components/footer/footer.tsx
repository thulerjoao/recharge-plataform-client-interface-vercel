"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Ame from "./icons/Ame.svg";
import Boleto from "./icons/Boleto.svg";
import FooterLogo from "./icons/FooterLogo.svg";
import MercadoPago from "./icons/MercadoPago.svg";
import Paypal from "./icons/Paypal.svg";
import PicPay from "./icons/PicPay.svg";
import Pix from "./icons/Pix.svg";
import Transfer from "./icons/Transfer.svg";
import { FooterContainer } from "./style";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="centerComponent">
        <div className="upperComponent">
          <FooterLogo />
          {/* <div className="paymentMethods">
            <Text
              align="center"
              fontName="SMALL"
              color={Theme.colors.mainHighlight}
            >
              Formas de Pagamento
            </Text>
            <span className="paymentIcons">
              <Pix />
              <MercadoPago />
              <PicPay />
              <Ame />
              <Paypal />
              <Transfer />
              <Boleto />
            </span>
          </div> */}
        </div>
        <div className="bottomComponent">
          <div className="topPhrase">
            {/* <Text nowrap align="center" fontName="TINY">
              Termos de uso
            </Text>
            <Text align="center" fontName="BIG_SEMI_BOLD">
              •
            </Text>
            <Text nowrap fontName="TINY">
              Política de privacidade
            </Text> */}
            <Text nowrap align="center" fontName="TINY">
              Desenvolvido por
            </Text>
            <Text
              tag="a"
              pointer
              underline
              nowrap
              align="center"
              fontName="TINY"
              color={Theme.colors.mainHighlight}
            >
              4MIGA GAMES
            </Text>
          </div>
          <div className="bottomPhrase">
            <Text align="center" fontName="TINY">
              Este site é operado por empresas distintas e independentes, não
              sendo responsáveis pelos serviços umas das outras
            </Text>
          </div>
          <div className="topPhrase"></div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
