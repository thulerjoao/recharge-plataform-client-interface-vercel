import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { ReactElement } from "react";
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
  return (
    <PriceCardContainer>
      <span className="tax">
        <div className="image">{image}</div>
        <div className="title">
          <Text
            nowrap
            color={Theme.colors.secondaryTextAction}
            fontName="REGULAR_MEDIUM"
          >
            {title}
          </Text>
        </div>
        <Text fontName="REGULAR_SEMI_BOLD">{tax}</Text>
      </span>
      <span className="totalCost">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          R$ {totalCost.toFixed(2)}
        </Text>
      </span>
      <span className="profitMargin">
        <Input height={32} value={`${profitMargin}%`} />
      </span>
      <span className="profitValue">
        <Input height={32} value={`R$ ${profitValue.toFixed(2)}`} />
      </span>
      <span className="saleValue">
        <Input height={32} value={`R$ ${sellValue.toFixed(2)}`} />
      </span>
    </PriceCardContainer>
  );
};

export default PriceCard;

// . {
//   max-width: 234px;
// }
// .totalCost {
//   max-width: 110px;
// }
// .profitMargin {
//   max-width: 164px;
// }
// .profitValue {
//   max-width: 147px;
// }
// .saleValue {
//   max-width: 146px;
// }
