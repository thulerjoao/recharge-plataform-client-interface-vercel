import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import Pix from "../icons/Pix.svg";
import { PixConfigurationContainer } from "./pixConfigurationStyle";
import { formatPrice } from "utils/formatPrice";

interface PixConfigurationProps {
  tax: number; //percentage
  totalCost: number;
  onValueChange?: (field: string, value: number) => void;
}

const PixConfiguration = ({
  tax,
  totalCost,
  onValueChange,
}: PixConfigurationProps) => {
  const theme = useTheme();
  return (
    <PixConfigurationContainer>
      <div className="pixConfiguration">
        <div className="pixHeader">
          <div className="pixIcon">
            <Pix />
          </div>
          <Text fontName="REGULAR_SEMI_BOLD" color={theme.text_01}>
            PIX
          </Text>
          <Text fontName="SMALL_MEDIUM" color={theme.text_03}>
            {tax}% de taxa
          </Text>
        </div>

        <div className="pixSummary">
          <div className="summaryItem">
            <Text fontName="TINY_MEDIUM" color={theme.text_03}>
              Custo Base
            </Text>
            <Text fontName="SMALL_SEMI_BOLD" color={theme.text_01}>
              R$ {formatPrice(totalCost - totalCost * (tax / 100))}
            </Text>
          </div>

          <div className="summaryItem">
            <Text fontName="TINY_MEDIUM" color={theme.text_03}>
              Taxa
            </Text>
            <Text fontName="SMALL_SEMI_BOLD" color={theme.approved}>
              R$ {formatPrice(totalCost * (tax / 100))}
            </Text>
          </div>

          <div className="summaryItem highlight">
            <Text fontName="TINY_MEDIUM" color={theme.text_03}>
              Valor Total
            </Text>
            <Text fontName="REGULAR_SEMI_BOLD" color={theme.mainColor}>
              R$ {formatPrice(totalCost)}
            </Text>
          </div>
        </div>
      </div>
    </PixConfigurationContainer>
  );
};

export default PixConfiguration;
