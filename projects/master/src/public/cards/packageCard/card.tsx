import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { PackageCardContainer } from "./style";

interface PackageCardProps {
  title: string;
  image: ReactElement;
  bestOffer?: boolean;
  price: number;
  selected?: boolean;
}

const PackageCard = ({
  title,
  image,
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
      <figure>{image}</figure>
      {bestOffer ? (
        <span className="bestPrice">
          <Text
            align="center"
            color={Theme.colors.mainBbackgroundSolid}
            fontName="SMALL_SEMI_BOLD"
          >
            Melhor Preço
          </Text>
        </span>
      ) : (
        <Text
          tag="h4"
          color={Theme.colors.mainHighlight}
          align="end"
          fontName="SMALL"
          margin="18px 16px 0 0"
        >
          Por apenas
        </Text>
      )}
      <Text
        tag="h4"
        align="end"
        fontName="REGULAR_SEMI_BOLD"
        margin="9px 16px 0 0"
      >
        R$ ${price.toFixed(2)}
      </Text>
    </PackageCardContainer>
  );
};

export default PackageCard;
