import Text from "@4miga/design-system/components/Text";
import { BottomOfferContainer } from "./style";
import Image from "next/image";
import offer from "./offer.png";

const BottomOffer = () => {
  return (
    <BottomOfferContainer>
      <Text
        tag="h2"
        align="center"
        fontName="LARGE_SEMI_BOLD"
        margin="56px 0 24px 0"
      >
        OFERTA X
      </Text>
      <Image className="offerBanner" src={offer} alt="offer banner" />
    </BottomOfferContainer>
  );
};

export default BottomOffer;
