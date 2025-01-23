import Text from "@4miga/design-system/components/Text";
import { ValueCardContainer } from "./style";

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
        <Text fontName="REGULAR_SEMI_BOLD">R$ {value.toFixed(2)}</Text>
      </span>
    </ValueCardContainer>
  );
};

export default ValueCard;
