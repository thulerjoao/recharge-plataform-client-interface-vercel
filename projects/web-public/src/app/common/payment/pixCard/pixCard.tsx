import Text from "@4miga/design-system/components/text/text";
import { Icons } from "@4miga/design-system/icons/icons";
import { Theme } from "@4miga/design-system/theme/theme";
import { BottomElement, PixCardContainer } from "./style";
import { useEffect, useState } from "react";
import Button from "@4miga/design-system/components/button/button";
import Image from "next/image";
import qrcode from "./qrcode.png";

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
    <>
      <PixCardContainer
        onClick={() => handleFirstExpand()}
        firstExpand={firstExpand}
        isRounded={isRounded}
        secondExpand={secondExpand}
        initialized={initialized}
      >
        <div className="headerText">
          <span>
            <Icons.bankTags.pix />
          </span>
          <Text
            fontType={Theme.font.REGULAR_MEDIUM}
            color={Theme.colors.mainBlack}
          >
            Pix
          </Text>
        </div>
        <span className="downArrow">
          {firstExpand ? (
            <Icons.navigation.UpArrow />
          ) : (
            <Icons.navigation.DownArrow />
          )}
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
            <Text fontType={Theme.font.REGULAR} color={Theme.colors.mainBlack}>
              Valor para pagamento
            </Text>
          </div>
          <div>
            <Text
              align="end"
              fontType={Theme.font.REGULAR_SEMI_BOLD}
              color={Theme.colors.mainBlack}
            >
              R$ 12,00
            </Text>
          </div>
        </div>
        <div className="pixCode">
          <Text
            fontType={Theme.font.REGULAR_SEMI_BOLD}
            color={Theme.colors.mainBlack}
          >
            0001234567890012345678900BR
          </Text>
        </div>
        <div className="bottomButton">
          <Button
            onClick={() => handleGeneratePix()}
            loading={loading}
            height="tall"
            title={secondExpand ? "Copiar código Pix" : "Gerar Pix"}
            fontType={Theme.font.SMALL_MEDIUM}
          />
        </div>
        <div className="pixImage">
          <Text
            align="center"
            fontType={Theme.font.SMALL_MEDIUM}
            color={Theme.colors.mainBlack}
          >
            {`Por gentileza, utilize a opção "Copiar e Colar" do PIX em seu
            aplicativo bancário.`}
          </Text>
          <Image src={qrcode} alt="QR code para pagar o pix" />
        </div>
      </BottomElement>
    </>
  );
};

export default PixCard;
