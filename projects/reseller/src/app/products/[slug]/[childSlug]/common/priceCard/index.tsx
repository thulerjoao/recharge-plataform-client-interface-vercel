import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { ReactElement } from "react";
import { formatPrice } from "utils/formatPrice";
import { PriceCardContainer } from "./style";

interface CardProps {
  image: ReactElement;
  title: string;
  tax: string;
  totalCost: number;
  profitMargin: number;
  profitValue: number;
  sellValue: number;
}

const PriceCard = ({
  image,
  title,
  tax,
  totalCost,
  profitMargin,
  profitValue,
  sellValue,
}: CardProps) => {
  const theme = useTheme();
  return (
    <PriceCardContainer>
      <span className="tax">
        <div className="image">{image}</div>
        <div className="title">
          <Text nowrap color={theme.text_04} fontName="REGULAR_MEDIUM">
            {title}
          </Text>
        </div>
        <Text fontName="REGULAR_SEMI_BOLD">{tax}</Text>
      </span>
      <span className="totalCost">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          R$ {formatPrice(totalCost)}
        </Text>
      </span>
      <span className="profitMargin">
        <Input height={32} value={`${profitMargin}%`} />
      </span>
      <span className="profitValue">
        <Input height={32} value={`R$ ${formatPrice(profitValue)}`} />
      </span>
      <span className="saleValue">
        <Input height={32} value={`R$ ${formatPrice(sellValue)}`} />
      </span>
    </PriceCardContainer>
  );
};

export default PriceCard;
