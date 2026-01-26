import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import Offer from "./img/Offer.png";
import DiamondIcon from "./img/UniDiamond.png";
import { PackageCardCompactContainer } from "./style";

interface PackageCardProps {
  item: PackageType;
  selected: boolean;
  paymentIndex?: number;
  valueWithDicount?: number;
  paymentPage?: boolean;
}

const PackageCardCompact = ({
  item,
  selected,
  valueWithDicount,
  paymentPage,
}: PackageCardProps) => {
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
        <Text tag="h2" fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainText}>
          {formatNumber(item.amountCredits)}
        </Text>
        <figure>
          <Image
            src={DiamondIcon}
            alt={`Ícone de diamante - ${item.amountCredits} ${item.amountCredits > 1 ? "diamantes" : "diamante"}`}
            height={50}
            width={40}
            quality={75}
          />
        </figure>
      </div>
      <Text
        className="diamondText desktop"
        fontName="SMALL_MEDIUM"
        align="center"
        color={Theme.colors.maindark}
      >
        {item.amountCredits > 1 ? "Diamantes Bigo" : "Diamante Bigo"}
      </Text>
      <Text
        className="diamondText mobile"
        fontName="SMALL_MEDIUM"
        align="center"
        color={Theme.colors.maindark}
      >
        {item.amountCredits > 1 ? "Diamantes" : "Diamante"}
      </Text>
      <div className="priceContainer">
        {valueWithDicount && (
          <Text
            className="basePriceDiscount"
            fontName="TINY"
            color={Theme.colors.secondaryTextAction}
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
          color={Theme.colors.maindark}
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
          color={Theme.colors.maindark}
        >
          {formatPrice(valueWithDicount ? +valueWithDicount : item.basePrice)}
        </Text>
      </div>
      {item.isOffer && (
        <figure className="offerContainer">
          <Image
            src={Offer}
            alt={`Badge de oferta especial - ${item.name}`}
            height={100}
            width={100}
            quality={75}
          />
        </figure>
      )}
    </PackageCardCompactContainer>
  );
};

export default PackageCardCompact;
