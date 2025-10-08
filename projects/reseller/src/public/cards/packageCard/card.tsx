import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { formatPrice } from "utils/formatPrice";
import { PackageCardContainer } from "./style";

interface PackageCardProps {
  title: string;
  imageUrl: string;
  bestOffer?: boolean;
  price: number;
  selected?: boolean;
}

const PackageCard = ({
  title,
  imageUrl,
  bestOffer,
  price,
  selected,
}: PackageCardProps) => {
  return (
    <PackageCardContainer selected={selected}>
      <Text
        tag="h2"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
        margin="12px 0 0 0"
      >
        {title}
      </Text>
      {/* <Text tag="h2" align="center" fontName="REGULAR_SEMI_BOLD">
        {amountType}
      </Text> */}
      <figure>
        <Image src={imageUrl} alt="Imagem do pacote" width={80} height={80} />
      </figure>
      <Text
        color={Theme.colors.secondaryText}
        margin={bestOffer ? "8px 0 0 8px" : "24px 0 0 8px"}
        fontName="SUPER_TINY_MEDIUM"
      >
        POR APENAS
      </Text>
      <Text margin="0 0 0 8px" tag="h4" fontName="REGULAR_SEMI_BOLD">
        R$ {formatPrice(price)}
      </Text>
      {bestOffer && (
        <div className="bestPriceContainer">
          <span className="bestPrice">
            <div className="bow leftBow">
              <div className="bow-inner" />
              <div className="bow-inner-2" />
            </div>
            <Text
              align="center"
              color={Theme.colors.mainBbackgroundSolid}
              fontName="SUPER_TINY_SEMI_BOLD"
              margin="-3px 0 0 0"
            >
              ⭐ Oferta especial
            </Text>
            <div className="bow rightBow">
              <div className="bow-inner" />
              <div className="bow-inner-2" />
            </div>
          </span>
        </div>
      )}
    </PackageCardContainer>
  );
};

export default PackageCard;
