import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import { PackageCardContainer } from "./style";
import { useState } from "react";

interface PackageCardProps {
  item: PackageType;
  selected: boolean;
  paymentIndex?: number;
}

const PackageCard = ({ item, selected, paymentIndex }: PackageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PackageCardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      selected={selected ? selected : isHovered}
    >
      <Text
        tag="h2"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
        margin="12px 0 0 0"
      >
        {item.name}
      </Text>
      <figure>
        <Image
          src={item.imgCardUrl}
          alt={`Imagem do pacote ${item.name}`}
          height={80}
          width={80}
        />
      </figure>

      <Text
        color={Theme.colors.secondaryText}
        margin={item.isOffer ? "8px 0 0 8px" : "24px 0 0 8px"}
        fontName="SUPER_TINY_MEDIUM"
      >
        POR APENAS
      </Text>
      <Text margin="0 0 0 8px" tag="h4" fontName="REGULAR_SEMI_BOLD">
        R${" "}
        {formatPrice(
          item.paymentMethods[paymentIndex ? paymentIndex : 0].price,
        )}
      </Text>
      {item.isOffer && (
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
