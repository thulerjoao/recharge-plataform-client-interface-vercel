import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const route = useRouter();

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
      <Text tag="h2" align="center" fontName="REGULAR_SEMI_BOLD">
        DIAMANTES
      </Text>
      <figure>
        <Image src={imageUrl} alt="Imagem do pacote" width={80} height={80} />
      </figure>
      <Text
        tag="h4"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
        margin="12px 0 0 0px"
      >
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
              fontName="TINY_MEDIUM"
              margin="-1px 0 0 0"
            >
              ⭐ Melhor oferta
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
