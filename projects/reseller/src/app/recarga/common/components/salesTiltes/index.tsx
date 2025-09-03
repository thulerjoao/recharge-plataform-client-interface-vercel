import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { SalesTitlesContainer } from "./style";

const ManualRechargeTitles = () => {
  return (
    <SalesTitlesContainer>
      <span className="orderNumber">
        <Text
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="REGULAR_MEDIUM"
        >
          Nº do Pedido
        </Text>
      </span>
      <span className="names">
        <Text
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="REGULAR_MEDIUM"
        >
          Data
        </Text>
      </span>
      <span className="names desktop">
        <Text
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="REGULAR_MEDIUM"
        >
          Pacote
        </Text>
      </span>
      <span className="status">
        <Text
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="REGULAR_MEDIUM"
        >
          Plataforma
        </Text>
      </span>
      <span className="status">
        <Text
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="REGULAR_MEDIUM"
        >
          Status
        </Text>
      </span>
    </SalesTitlesContainer>
  );
};

export default ManualRechargeTitles;
