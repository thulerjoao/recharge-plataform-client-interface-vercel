"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Ame from "./images/Ame.svg";
import Boleto from "./images/Boleto.svg";
import FooterLogo from "./images/FooterLogo.svg";
import MercadoPago from "./images/MercadoPago.svg";
import Paypal from "./images/Paypal.svg";
import PicPay from "./images/PicPay.svg";
import Pix from "./images/Pix.svg";
import Transfer from "./images/Transfer.svg";
import { FooterContainer } from "./style";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="centerComponent">
        <div className="upperComponent">
          <FooterLogo />
          <div className="paymentMethods">
            <Text
              align="center"
              fontType="SMALL"
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
          </div>
        </div>
        <div className="bottomComponent">
          <div className="topPhrase">
            <Text
              nowrap
              align="center"
              fontType="TINY"
              color={Theme.colors.mainlight}
            >
              Termos de uso
            </Text>
            <Text
              align="center"
              fontType="BIG_SEMI_BOLD"
              color={Theme.colors.mainlight}
            >
              •
            </Text>
            <Text nowrap fontType="TINY" color={Theme.colors.mainlight}>
              Política de privacidade
            </Text>
          </div>
          <div className="bottomPhrase">
            <Text
              nowrap
              align="center"
              fontType="TINY"
              color={Theme.colors.mainlight}
            >
              Desenvolvido por
            </Text>
            <Text
              pointer
              underline
              nowrap
              align="center"
              fontType="TINY"
              color={Theme.colors.mainHighlight}
            >
              4MIGA GAMES
            </Text>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
