import Text from "@4miga/design-system/components/Text";
import Image, { StaticImageData } from "next/image";
import { MonthCardContainer } from "./style";
import { formatPrice } from "utils/formatPrice";

interface CardProps {
  image: StaticImageData;
  sold: number;
  invoicing: number;
  profit: number;
}

const MonthCard = ({ image, sold, invoicing, profit }: CardProps) => {
  return (
    <MonthCardContainer>
      <Image src={image} alt="Imagem do jogo" />
      <section>
        <div>
          <Text fontName="REGULAR">Vendas</Text>
          <Text margin="10px 0 0 0" fontName="REGULAR_MEDIUM">
            {sold}
          </Text>
        </div>
        <div>
          <Text fontName="REGULAR">Faturamento</Text>
          <Text margin="10px 0 0 0" fontName="REGULAR_MEDIUM">
            {formatPrice(invoicing)}
          </Text>
        </div>
        <div>
          <Text fontName="REGULAR">Lucro</Text>
          <Text margin="10px 0 0 0" fontName="REGULAR_MEDIUM">
            {formatPrice(profit)}
          </Text>
        </div>
      </section>
    </MonthCardContainer>
  );
};

export default MonthCard;
