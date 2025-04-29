import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import DefaultPackage from "public/img/DefaultPackage.jpg";
import { useEffect, useState } from "react";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import { PackageCardContainer } from "./style";

interface PackageCardProps {
  item: PackageType;
  selected?: boolean;
  paymentIndex?: number;
}

const PackageCard = ({ item, selected, paymentIndex }: PackageCardProps) => {
  const [isImageValid, setIsImageValid] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isValidImageUrl = async (): Promise<boolean> => {
    try {
      const response = await fetch(item.imgCardUrl, { method: "HEAD" });
      const contentType = response.headers.get("content-type");
      return response.ok && contentType?.startsWith("image");
    } catch {
      return false;
    }
  };
  useEffect(() => {
    const checkImage = async () => {
      const valid = await isValidImageUrl();
      setIsImageValid(valid);
    };

    checkImage();
  }, [item.imgCardUrl, isValidImageUrl]);

  return (
    <PackageCardContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
      }}
      selected={selected ? selected : hover}
    >
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
      <Image
        src={isImageValid ? item.imgCardUrl : DefaultPackage}
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
