import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Pix from "../icons/Pix.svg";
import { PixConfigurationContainer } from "./pixConfigurationStyle";

interface PixConfigurationProps {
  tax: string;
  totalCost: number;
  profitMargin: number;
  profitValue: number;
  sellValue: number;
  isEditing?: boolean;
  onValueChange?: (field: string, value: number) => void;
}

const PixConfiguration = ({
  tax,
  totalCost,
  profitMargin,
  profitValue,
  sellValue,
  isEditing = false,
  onValueChange,
}: PixConfigurationProps) => {
  return (
    <PixConfigurationContainer>
      <div className="pixConfiguration">
        <div className="pixHeader">
          <div className="pixIcon">
            <Pix />
          </div>
          <Text fontName="REGULAR_SEMI_BOLD" color={Theme.colors.mainlight}>
            PIX
          </Text>
          <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
            {tax} de taxa
          </Text>
        </div>

        <div className="pixSummary">
          <div className="summaryItem">
            <Text fontName="TINY_MEDIUM" color={Theme.colors.secondaryText}>
              Custo Total
            </Text>
            <Text fontName="SMALL_SEMI_BOLD" color={Theme.colors.mainlight}>
              R$ {totalCost.toFixed(2)}
            </Text>
          </div>

          <div className="summaryItem">
            <Text fontName="TINY_MEDIUM" color={Theme.colors.secondaryText}>
              Lucro ({profitMargin}%)
            </Text>
            <Text fontName="SMALL_SEMI_BOLD" color={Theme.colors.approved}>
              R$ {profitValue.toFixed(2)}
            </Text>
          </div>

          <div className="summaryItem highlight">
            <Text fontName="TINY_MEDIUM" color={Theme.colors.secondaryText}>
              Valor Final
            </Text>
            <Text
              fontName="REGULAR_SEMI_BOLD"
              color={Theme.colors.mainHighlight}
            >
              R$ {sellValue.toFixed(2)}
            </Text>
          </div>
        </div>
      </div>
    </PixConfigurationContainer>
  );
};

export default PixConfiguration;
