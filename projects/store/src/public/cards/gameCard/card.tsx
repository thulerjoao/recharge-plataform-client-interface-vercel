import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { CardContainer } from "./style";
import Image, { StaticImageData } from "next/image";

interface CardProps {
  image: StaticImageData;
  name: string;
}

const GameCard = ({ image, name }: CardProps) => {
  const route = useRouter();

  return (
    <CardContainer onClick={() => route.push("/products")}>
      <Image src={image} alt={`Imagem do jogo ${name}`} />
      <Text
        tag="h2"
        align="center"
        fontName="REGULAR_MEDIUM"
        margin="16px 0 0 0"
      >
        {name}
      </Text>
    </CardContainer>
  );
};

export default GameCard;
