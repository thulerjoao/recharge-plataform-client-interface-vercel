import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useState } from "react";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import { PackageCardContainer } from "./style";

interface PackageCardProps {
  item: PackageType;
  selected: boolean;
  paymentIndex?: number;
  valueWithDicount?: number;
}

const PackageCard = ({
  item,
  selected,
  valueWithDicount,
}: PackageCardProps) => {
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
      <div className="priceContainer">
        <Text
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
        )}
      </div>

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
