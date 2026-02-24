import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import { CardContainer } from "./style";

interface CardProps {
  product: ProductType;
}

const GameCard = ({ product }: CardProps) => {
  const route = useRouter();

  const handleProductClick = (path: string) => {
    const res = formatString(path);
    route.push(`/product?slug=${res}`);
  };

  return (
    <CardContainer onClick={() => handleProductClick(product.name)}>
      <Image
        src={product.storeCustomization?.imgCardUrl || product.imgCardUrl}
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
