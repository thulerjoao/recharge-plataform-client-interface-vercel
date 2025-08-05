import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import CdnImage from "@4miga/design-system/components/CdnImage";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import { PackageCardContainer } from "./style";

interface PackageCardProps {
  item: PackageType;
  selected: boolean;
  paymentIndex?: number;
}

const PackageCard = ({ item, selected, paymentIndex }: PackageCardProps) => {
  return (
    <PackageCardContainer selected={selected}>
      <Text
        tag="h2"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
        margin="12px 0 0 0"
      >
        Bigo {item.amountCredits}
      </Text>
      <Text tag="h2" align="center" fontName="REGULAR_SEMI_BOLD">
        Diamantes
      </Text>
      <CdnImage
        src={item.imgCardUrl}
        alt={`Imagem do pacote ${item.name}`}
        height={100}
        width={100}
      />
      {item.isOffer ? (
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
        R${" "}
        {formatPrice(
          item.paymentMethods[paymentIndex ? paymentIndex : 0].price,
        )}
      </Text>
    </PackageCardContainer>
  );
};

export default PackageCard;
