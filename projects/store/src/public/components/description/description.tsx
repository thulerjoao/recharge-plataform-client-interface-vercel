import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useProduct } from "contexts/product";
import Image from "next/image";
import DefaultBanner from "public/img/DefaultBanner.jpg";
import { useEffect, useState } from "react";
import { DescriptionContainer } from "./style";
import { getDevice } from "utils/getDevice";

const Description = () => {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const device = getDevice();
  const { currentProduct } = useProduct();

  useEffect(() => {
    device === "desktop" ? setSeeMore(true) : setSeeMore(false);
  }, [device]);

  const [isImageValid, setIsImageValid] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isValidImageUrl = async (): Promise<boolean> => {
    try {
      const response = await fetch(currentProduct.imgBannerUrl, {
        method: "HEAD",
      });
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
  }, [currentProduct, isValidImageUrl]);

  return (
    <DescriptionContainer>
      <Image
        src={isImageValid ? currentProduct.imgBannerUrl : DefaultBanner}
        alt={`Imagem do pacote ${currentProduct && currentProduct.name}`}
        height={600}
        width={1000}
      />
      <div className="centerContent">
        <Text margin="24px 0 0 0 " fontName="BIG_SEMI_BOLD">
          {currentProduct && currentProduct.name.toUpperCase()}
        </Text>
        {!seeMore && (
          <span style={{ cursor: "pointer" }} onClick={() => setSeeMore(true)}>
            <Text
              margin="8px 0 0 0"
              underline
              fontName="REGULAR"
              color={Theme.colors.secondaryText}
            >
              ver mais informações
            </Text>
          </span>
        )}
      </div>
      {seeMore && (
        <div className="centerContent">
          <div className="instructions">
            <Text
              margin="24px 0 0 0 "
              color={Theme.colors.secondaryText}
              fontName="REGULAR_SEMI_BOLD"
            >
              Instruções
            </Text>
            <Text margin="24px 0 0 0 " fontName="REGULAR">
              {currentProduct && currentProduct.instructions}
            </Text>
          </div>
          <div className="instructions">
            <Text
              margin="24px 0 0 0 "
              color={Theme.colors.secondaryText}
              fontName="REGULAR_SEMI_BOLD"
            >
              Sobre {currentProduct && currentProduct.name}
            </Text>
            <Text margin="24px 0 0 0 " fontName="REGULAR">
              {currentProduct && currentProduct.instructions}
            </Text>
          </div>
          {seeMore && device !== "desktop" && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSeeMore(false)}
            >
              <Text
                margin="24px 0 0 0"
                underline
                fontName="REGULAR"
                align="center"
                color={Theme.colors.secondaryText}
              >
                ver menos
              </Text>
            </span>
          )}
        </div>
      )}
    </DescriptionContainer>
  );
};

export default Description;
