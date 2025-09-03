import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { ReactElement } from "react";
import { PriceCardMobileContainer } from "./style";

interface CardProps {
  image: ReactElement;
  title: string;
  tax: string;
  totalCost: number;
  profitMargin: number;
  profitValue: number;
  sellValue: number;
}

const PriceCardMobile = ({
  image,
  title,
  tax,
  totalCost,
  profitMargin,
  profitValue,
  sellValue,
}: CardProps) => {
  return (
    <PriceCardMobileContainer>
      <div className="top">
        <div className="image">{image}</div>
        <span>
          <Text
            color={Theme.colors.secondaryTextAction}
            fontName="REGULAR_MEDIUM"
          >
            {title}
          </Text>
        </span>
      </div>
      <div className="values">
        <Text fontName="REGULAR_MEDIUM">TAXA</Text>
        <Text align="end" fontName="REGULAR_SEMI_BOLD">
          {tax}
        </Text>
      </div>
      <div className="values">
        <Text
          color={Theme.colors.secondaryTextAction}
          fontName="REGULAR_MEDIUM"
        >
          CUSTO BASE
        </Text>
        <Text align="end" fontName="REGULAR_SEMI_BOLD">
          R$ 1,90
        </Text>
      </div>
      <div className="values">
        <Text fontName="REGULAR_MEDIUM">CUSTO TOTAL</Text>
        <Text align="end" fontName="REGULAR_SEMI_BOLD">
          {totalCost}
        </Text>
      </div>
      <div className="inputs">
        <Text margin="16px 0 8px 0" fontName="REGULAR_MEDIUM">
          MARGEM DE LUCRO
        </Text>
        <Input height={32} value={`${profitMargin}%`} />
      </div>
      <div className="inputs">
        <Text margin="0 0 8px 0" fontName="REGULAR_MEDIUM">
          VALOR DE LUCRO
        </Text>
        <Input height={32} value={`${profitValue}%`} />
      </div>
      <div className="inputs">
        <Text margin="0 0 8px 0" fontName="REGULAR_MEDIUM">
          VALOR DE VENDA
        </Text>
        <Input height={32} value={`${sellValue}%`} />
      </div>
    </PriceCardMobileContainer>
  );
};

export default PriceCardMobile;
