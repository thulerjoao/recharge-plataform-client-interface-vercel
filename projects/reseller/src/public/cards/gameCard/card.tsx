import Text from "@4miga/design-system/components/Text";
import Image, { StaticImageData } from "next/image";
import { CardContainer } from "./style";

interface CardProps {
  image: StaticImageData;
  name: string;
}

const GameCard = ({ image, name }: CardProps) => {
  return (
    <CardContainer>
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
