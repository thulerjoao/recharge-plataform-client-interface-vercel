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
      <Text align="end" fontName="REGULAR_MEDIUM">
        R$ {value.toFixed(2)}
      </Text>
    </ValueCardContainer>
  );
};

export default ValueCard;
