import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PackageType } from "types/deviceTypes";
import { PackageCardContainer } from "./style";
import Image from "next/image";
import ImageNotFound from "public/img/ImageNotFound.jpg";

interface PackageCardProps {
  item: PackageType;
  selected: boolean;
}

const PackageCard = ({ item, selected }: PackageCardProps) => {
  const route = useRouter();

  const [isImageValid, setIsImageValid] = useState<boolean>(false);

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
      <Image
        src={isImageValid ? item.imgCardUrl : ImageNotFound}
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
        R$ {item.amountCredits.toFixed(2)}
      </Text>
    </PackageCardContainer>
  );
};

export default PackageCard;
