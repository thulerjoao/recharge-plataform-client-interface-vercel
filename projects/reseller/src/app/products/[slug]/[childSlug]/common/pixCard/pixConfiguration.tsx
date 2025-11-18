import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
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
            {tax}% de taxa
          </Text>
        </div>

        <div className="pixSummary">
          <div className="summaryItem">
            <Text fontName="TINY_MEDIUM" color={Theme.colors.secondaryText}>
              Custo Base
            </Text>
            <Text fontName="SMALL_SEMI_BOLD" color={Theme.colors.mainlight}>
              R$ {formatPrice(totalCost - totalCost * (tax / 100))}
            </Text>
          </div>

          <div className="summaryItem">
            <Text fontName="TINY_MEDIUM" color={Theme.colors.secondaryText}>
              Taxa
            </Text>
            <Text fontName="SMALL_SEMI_BOLD" color={Theme.colors.approved}>
              R$ {formatPrice(totalCost * (tax / 100))}
            </Text>
          </div>

          <div className="summaryItem highlight">
            <Text fontName="TINY_MEDIUM" color={Theme.colors.secondaryText}>
              Valor Total
            </Text>
            <Text
              fontName="REGULAR_SEMI_BOLD"
              color={Theme.colors.mainHighlight}
            >
              R$ {formatPrice(totalCost)}
            </Text>
          </div>
        </div>
      </div>
    </PixConfigurationContainer>
  );
};

export default PixConfiguration;
