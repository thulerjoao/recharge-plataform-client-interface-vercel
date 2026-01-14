import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useState } from "react";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import { PackageCardCompactContainer } from "./style";
import DiamondIcon from "./img/FourDiamond.png";

interface PackageCardCompactProps {
  item: PackageType;
  selected: boolean;
  paymentIndex?: number;
  valueWithDicount?: number;
}

const PackageCardCompact = ({
  item,
  selected,
  valueWithDicount,
}: PackageCardCompactProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PackageCardCompactContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      selected={selected ? selected : isHovered}
    >
      {item.isOffer && (
        <div className="hotBadge">
          <Text
            align="center"
            color={Theme.colors.mainBbackgroundSolid}
            fontName="SUPER_TINY_SEMI_BOLD"
          >
            HOT
          </Text>
        </div>
      )}

      <figure>
        {/* <Image
          src={item.imgCardUrl}
          alt={`Imagem do pacote ${item.name}`}
          height={50}
          width={50}
          style={{ objectFit: "contain" }}
        /> */}
        <Image
          src={DiamondIcon}
          alt={`Imagem do pacote ${item.name}`}
          height={100}
          width={100}
          style={{ objectFit: "contain" }}
        />
      </figure>

      <Text
        tag="h3"
        align="center"
        fontName="TINY_SEMI_BOLD"
        margin="8px 0 0 0"
        style={{
          minHeight: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.name}
      </Text>

      <div className="priceContainer">
        {valueWithDicount && +valueWithDicount !== +item.basePrice ? (
          <>
            <Text
              align="center"
              nowrap
              margin="0"
              tag="span"
              fontName="TINY"
              style={{ textDecoration: "line-through", opacity: 0.6 }}
            >
              R$ {formatPrice(item.basePrice)}
            </Text>
            <Text
              align="center"
              color={Theme.colors.approved}
              nowrap
              margin="0"
              tag="h4"
              fontName="SMALL_SEMI_BOLD"
            >
              R$ {formatPrice(valueWithDicount)}
            </Text>
          </>
        ) : (
          <Text
            align="center"
            nowrap
            margin="0"
            tag="h4"
            fontName="SMALL_SEMI_BOLD"
          >
            R$ {formatPrice(item.basePrice)}
          </Text>
        )}
      </div>
    </PackageCardCompactContainer>
  );
};

export default PackageCardCompact;
