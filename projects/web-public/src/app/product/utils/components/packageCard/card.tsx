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
}

const PackageCard = ({ title, image, bestOffer, price }: PackageCardProps) => {
  const route = useRouter();

  return (
    <PackageCardContainer onClick={() => route.replace("/product")}>
      <Text
        tag="h2"
        align="center"
        fontType="REGULAR_SEMI_BOLD"
        margin="16px 0 0 0"
      >
        {title}
      </Text>
      <Text tag="h2" align="center" fontType="REGULAR_SEMI_BOLD">
        DIAMANTES
      </Text>
      <figure>{image}</figure>
      {bestOffer ? (
        <span className="bestPrice">
          <Text
            align="center"
            color={Theme.colors.mainBbackgroundSolid}
            fontType="SMALL_SEMI_BOLD"
          >
            Melhor Preço
          </Text>
        </span>
      ) : (
        <Text
          tag="h4"
          color={Theme.colors.mainHighlight}
          align="end"
          fontType="SMALL"
          margin="18px 16px 0 0"
        >
          Por apenas
        </Text>
      )}
      <Text
        tag="h4"
        align="end"
        fontType="REGULAR_SEMI_BOLD"
        margin="9px 16px 0 0"
      >
        {`R$ ${price.toFixed(2)}`}
      </Text>
    </PackageCardContainer>
  );
};

export default PackageCard;
