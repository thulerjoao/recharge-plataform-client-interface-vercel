import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageNotFound from "public/img/ImageNotFound.jpg";
import { useEffect, useState } from "react";
import { ProductType } from "types/productTypes";
import { checkImageUrl } from "utils/checkImageUrl";
import { formatString } from "utils/formatString";
import { CardContainer } from "./style";

interface CardProps {
  product: Partial<ProductType>;
}

const GameCard = ({ product }: CardProps) => {
  const route = useRouter();
  const handleProductClick = (path: string) => {
    const res = formatString(path);
    route.push(`/products/${res}`);
  };

  return (
    <CardContainer onClick={() => handleProductClick(product.name)}>
      <Image
        src={product.imgCardUrl}
        alt={`Imagem do jogo ${product.name}`}
        height={200}
        width={200}
      />
      <Text
        tag="h2"
        align="center"
        fontName="REGULAR_MEDIUM"
        margin="16px 0 0 0"
      >
        {product.name}
      </Text>
    </CardContainer>
  );
};

export default GameCard;
