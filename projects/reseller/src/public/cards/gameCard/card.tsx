import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import { ProductType } from "types/productTypes";
import { CardContainer } from "./style";

interface CardProps {
  product: Partial<ProductType>;
}

const GameCard = ({ product }: CardProps) => {
  return (
    <CardContainer>
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
