import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import DownArrow from "../../icons/DownArrow.svg";
import Pix from "../../icons/Pix.svg";
import UpArrow from "../../icons/UpArrow.svg";
import qrcode from "./qrcode.png";
import { BottomElement, PixCardContainer } from "./style";

const PixCard = () => {
  const [firstExpand, setFirstExpand] = useState<boolean>(false);
  const [secondExpand, setSecondExpand] = useState<boolean>(false);
  const [isRounded, setIsRounded] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const handleFirstExpand = () => {
    if (!initialized) {
      setInitialized(true);
    }
    setFirstExpand(!firstExpand);
  };

  useEffect(() => {
    if (firstExpand === false) {
      setTimeout(() => {
        setIsRounded(true);
      }, 400);
    } else {
      setIsRounded(false);
    }
  }, [firstExpand]);

  const handleGeneratePix = () => {
    setLoading(true);
    setTimeout(() => {
      setSecondExpand(true);
      setLoading(false);
    }, 1300);
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        prop !== "firstExpand" &&
        prop !== "isRounded" &&
        prop !== "secondExpand" &&
        prop !== "initialized"
      }
    >
      <PixCardContainer
        onClick={() => handleFirstExpand()}
        firstExpand={firstExpand}
        isRounded={isRounded}
        secondExpand={secondExpand}
        initialized={initialized}
      >
        <div className="headerText">
          <span>
            <Pix />
          </span>
          <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryAction}>
            Pix
          </Text>
        </div>
        <span className="downArrow">
          {firstExpand ? <UpArrow /> : <DownArrow />}
        </span>
      </PixCardContainer>
      <BottomElement
        initialized={initialized}
        secondExpand={secondExpand}
        firstExpand={firstExpand}
        isRounded={isRounded}
      >
        <div className="valueToPay">
          <div style={{ width: "300px" }}>
            <Text fontName="REGULAR" color={Theme.colors.secondaryAction}>
              Valor para pagamento
            </Text>
          </div>
          <div>
            <Text
              align="end"
              fontName="REGULAR_SEMI_BOLD"
              color={Theme.colors.secondaryAction}
            >
              R$ 12,00
            </Text>
          </div>
        </div>
        <div className="pixCode">
          <Text
            align="center"
            fontName="REGULAR_SEMI_BOLD"
            color={Theme.colors.secondaryAction}
          >
            0001234567890012345678900BR
          </Text>
        </div>
        <div className="bottomButton">
          <Button
            onClick={() => handleGeneratePix()}
            loading={loading}
            height={40}
            rounded
            title={secondExpand ? "Copiar código Pix" : "Gerar Pix"}
          />
        </div>
        <div className="pixImage">
          <Text
            align="center"
            fontName="SMALL_MEDIUM"
            color={Theme.colors.secondaryAction}
          >
            {`Por gentileza, utilize a opção "Copiar e Colar" do PIX em seu
            aplicativo bancário.`}
          </Text>
          <Image src={qrcode} alt="QR code para pagar o pix" />
        </div>
      </BottomElement>
    </StyleSheetManager>
  );
};

export default PixCard;
