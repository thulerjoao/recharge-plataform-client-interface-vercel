import Text from "@4miga/design-system/components/Text";
import { PaginationContainer } from "./style";
import { Theme } from "@4miga/design-system/theme/theme";

const Pagination = () => {
  return (
    <PaginationContainer>
      <Text align="center" fontName="REGULAR_SEMI_BOLD">
        1
      </Text>
      <Text
        align="center"
        color={Theme.colors.secondaryText}
        fontName="REGULAR_SEMI_BOLD"
      >
        2
      </Text>
      <Text
        align="center"
        color={Theme.colors.secondaryText}
        fontName="REGULAR_SEMI_BOLD"
      >
        3
      </Text>
      <Text
        align="center"
        color={Theme.colors.secondaryText}
        fontName="REGULAR_SEMI_BOLD"
      >
        4
      </Text>
      <Text
        align="center"
        color={Theme.colors.secondaryText}
        fontName="REGULAR_SEMI_BOLD"
      >
        5
      </Text>
      <Text
        className="dots"
        align="center"
        color={Theme.colors.secondaryText}
        fontName="REGULAR_SEMI_BOLD"
      >
        ...
      </Text>
      <Text
        align="center"
        color={Theme.colors.secondaryText}
        fontName="REGULAR_SEMI_BOLD"
      >
        55
      </Text>
    </PaginationContainer>
  );
};

export default Pagination;
