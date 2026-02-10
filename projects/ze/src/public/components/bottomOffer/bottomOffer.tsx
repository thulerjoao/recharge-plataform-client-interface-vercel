import Text from "@4miga/design-system/components/Text";
import { useStore } from "contexts/store/StoreProvider";
import Image from "next/image";
import { BottomOfferContainer } from "./style";

const BottomOffer = () => {
  const { store } = useStore();
  const offerBanner = store?.secondaryBannerUrl || null;
  if (!offerBanner) return null;
  return (
    <BottomOfferContainer>
      <Text
        tag="h2"
        align="center"
        fontName="LARGE_SEMI_BOLD"
        margin="56px 0 24px 0"
      >
        OFERTA ESPECIAL
      </Text>
      <div className="offerBannerContainer">
        <Image
          fill
          className="offerBanner"
          src={offerBanner}
          alt="Banner de oferta especial"
          sizes="(max-width: 539px) 100vw, (max-width: 768px) 85vw, 557px"
          quality={85}
        />
      </div>
    </BottomOfferContainer>
  );
};

export default BottomOffer;
