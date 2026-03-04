import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";

import { PackageCardCompactContainer } from "./style";

interface PackageCardProps {
  item: PackageType;
  selected: boolean;
  valueWithDicount?: number;
  paymentPage?: boolean;
}

const PackageCardCompact = ({
  item,
  selected,
  valueWithDicount,
  paymentPage,
}: PackageCardProps) => {
  const theme = useTheme();
  const formatNumber = (value: number) => {
    if (value === 1) return "01";
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  return (
    <PackageCardCompactContainer
      isOffer={item.isOffer}
      selected={selected}
      paymentPage={paymentPage}
    >
      <div className="diamondContainer">
        <Text tag="h2" fontName="LARGE_SEMI_BOLD" color={theme.text_01}>
          {formatNumber(item.amountCredits)}
        </Text>
      </div>
      <Text
        className="diamondText desktop"
        fontName="SMALL_MEDIUM"
        align="center"
        color={theme.text_01}
      >
        {item.amountCredits > 1 ? "Diamantes Bigo" : "Diamante Bigo"}
      </Text>
      <Text
        className="diamondText mobile"
        fontName="SMALL_MEDIUM"
        align="center"
        color={theme.text_01}
      >
        {item.amountCredits > 1 ? "Diamantes" : "Diamante"}
      </Text>
      <div className="priceContainer">
        {valueWithDicount && (
          <Text
            className="basePriceDiscount"
            fontName="TINY"
            color={theme.text_01}
            style={{ textDecoration: "line-through" }}
          >
            R$ {formatPrice(item.basePrice)}
          </Text>
        )}
        <Text
          nowrap
          margin={valueWithDicount ? "4px 0 0 4px" : "0 0 0 4px"}
          tag="h4"
          fontName="TINY_MEDIUM"
          style={{ width: "16px" }}
          color={theme.text_01}
        >
          R$
        </Text>
        <Text
          align="start"
          nowrap
          margin={valueWithDicount ? "4px 0 0 4px" : "0 0 0 4px"}
          tag="h3"
          fontName="LARGE_MEDIUM"
          style={{ width: "auto" }}
          color={theme.text_01}
        >
          {formatPrice(valueWithDicount ? +valueWithDicount : item.basePrice)}
        </Text>
      </div>
      {item.isOffer && (
        <div className="offerTextContainer">
          <Text
            tag="h2"
            align="center"
            fontName="SUPER_TINY_SEMI_BOLD"
            color={theme.text_02}
          >
            Em Oferta
          </Text>
        </div>
      )}
    </PackageCardCompactContainer>
  );
};

export default PackageCardCompact;
