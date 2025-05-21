import Text from "@4miga/design-system/components/Text";
import { ValueCardContainer } from "./style";
import { formatPrice } from "utils/formatPrice";

interface CardProps {
  title: string;
  value: number;
}

const ValueCard = ({ title, value }: CardProps) => {
  return (
    <ValueCardContainer>
      <Text nowrap fontName="REGULAR_MEDIUM">
        {title}
      </Text>
      <span>
        <Text fontName="REGULAR_SEMI_BOLD">R$ {formatPrice(value)}</Text>
      </span>
    </ValueCardContainer>
  );
};

export default ValueCard;
