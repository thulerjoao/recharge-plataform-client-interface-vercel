import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import { useTheme } from "styled-components";
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
  const theme = useTheme();
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
      <figure>
        <Image
          src={imageUrl}
          alt={`Imagem do pacote ${title}`}
          width={80}
          height={80}
        />
      </figure>
      <Text
        color={theme.text_03}
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
              color={theme.background_02}
              fontName="SUPER_TINY_SEMI_BOLD"
              margin="-3px 0 0 0"
            >
              ⭐ OFERTA ESPECIAL
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
