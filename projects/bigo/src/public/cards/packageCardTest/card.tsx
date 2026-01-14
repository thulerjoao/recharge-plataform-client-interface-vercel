import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useState } from "react";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import Offer3 from "./img/Offer3.png";
import Offer from "./img/Offer.png";
import DiamondIcon from "./img/UniDiamond.png";

import { PackageCardContainerTest } from "./style";

interface PackageCardProps {
  item: PackageType;
  selected: boolean;
  paymentIndex?: number;
  valueWithDicount?: number;
}

const PackageCardTest = ({
  item,
  selected,
  valueWithDicount,
}: PackageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (value: number) => {
    if (value === 1) return "01";
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  return (
    <PackageCardContainerTest
      isOffer={item.isOffer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      selected={selected ? selected : isHovered}
    >
      <div className="diamondContainer">
        <Text tag="h2" fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainText}>
          {formatNumber(item.amountCredits)}
        </Text>
        <figure>
          <Image
            src={DiamondIcon}
            alt={`Imagem do pacote ${item.name}`}
            height={50}
            width={40}
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
      {/* <Text
        color={Theme.colors.secondaryAction}
        // margin={item.isOffer ? "8px 0 0 8px" : "24px 0 0 8px"}
        margin="8px 0 8px 0"
        fontName="SUPER_TINY_MEDIUM"
      >
        POR APENAS
      </Text> */}
      <div className="priceContainer">
        <Text
          nowrap
          margin="0 0 0 4px"
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
          margin="0 0 0 4px"
          tag="h3"
          fontName="LARGE_MEDIUM"
          style={{ width: "auto" }}
          color={Theme.colors.maindark}
        >
          {formatPrice(item.basePrice)}
        </Text>
        {/* <Text
          align="start"
          nowrap
          margin="0 0 0 4px"
          tag="h4"
          fontName="REGULAR_SEMI_BOLD"
          style={
            valueWithDicount && +valueWithDicount !== +item.basePrice
              ? { textDecoration: "line-through", width: "auto" }
              : undefined
          }
        >
          R$ {formatPrice(item.basePrice)}
        </Text>
        {valueWithDicount && +valueWithDicount !== +item.basePrice && (
          <Text
            align="start"
            color={Theme.colors.approved}
            nowrap
            margin="0 0 0 4px"
            tag="h4"
            fontName="SUPER_TINY_MEDIUM"
          >
            R$ {formatPrice(valueWithDicount)}
          </Text>
        )} */}
      </div>
      {item.isOffer && (
        <figure className="offerContainer">
          <Image
            src={Offer}
            alt={`Imagem do pacote ${item.name}`}
            height={100}
            width={100}
          />
        </figure>
      )}
    </PackageCardContainerTest>
  );
};

export default PackageCardTest;
