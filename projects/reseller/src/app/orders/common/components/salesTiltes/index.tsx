import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { SalesTitlesContainer } from "./style";

const SalesTitles = () => {
  const theme = useTheme();
  return (
    <SalesTitlesContainer>
      <span className="orderNumber">
        <Text align="center" color={theme.mainColor} fontName="REGULAR_MEDIUM">
          Nº do Pedido
        </Text>
      </span>
      <span className="names">
        <Text align="center" color={theme.mainColor} fontName="REGULAR_MEDIUM">
          Cliente
        </Text>
      </span>
      <span className="names">
        <Text align="center" color={theme.mainColor} fontName="REGULAR_MEDIUM">
          Pacote
        </Text>
      </span>
      <span className="status">
        <Text align="center" color={theme.mainColor} fontName="REGULAR_MEDIUM">
          Pagamento
        </Text>
      </span>
      <span className="status">
        <Text align="center" color={theme.mainColor} fontName="REGULAR_MEDIUM">
          Recarga
        </Text>
      </span>
    </SalesTitlesContainer>
  );
};

export default SalesTitles;
