"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import FooterLogo from "./icons/FooterLogo.svg";
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
            <div className="termsAndConditions">
              <Text
                onClick={() => window.open("/terms", "_blank")}
                align="center"
                underline
                nowrap
                pointer
                fontName="TINY"
              >
                Termos e condições
              </Text>
            </div>
            <Text className="dot" align="center" fontName="BIG_SEMI_BOLD">
              •
            </Text>
            <div className="developedBy">
              <Text nowrap align="center" fontName="TINY">
                Desenvolvido por
              </Text>
              <Text
                tag="a"
                nowrap
                align="center"
                fontName="TINY"
                color={Theme.colors.mainHighlight}
                style={{ marginLeft: "4px" }}
              >
                4MIGA GAMES
              </Text>
            </div>

            {/* <Text nowrap fontName="TINY">
              Política de privacidade
            </Text> */}
          </div>
          <div className="bottomPhrase">
            <Text align="center" fontName="TINY">
              Este site é operado por empresas distintas e independentes, não
              sendo responsáveis pelos serviços umas das outras
            </Text>
          </div>
          <div />
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
