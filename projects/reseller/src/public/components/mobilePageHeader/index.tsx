import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { MobilePageHeaderContainer } from "./style";
import { useAuth } from "context/auth";

interface MobilePageHeaderProps {
  title: string;
}

const MobilePageHeader = ({ title }: MobilePageHeaderProps) => {
  const theme = useTheme();
  const { store } = useAuth();

  return (
    <MobilePageHeaderContainer>
      <Text
        margin="-4px 0 4px 0"
        color={theme.text_02}
        align="center"
        fontName="LARGE_SEMI_BOLD"
      >
        {title}
      </Text>
      <Text
        align="center"
        className="storeName"
        fontName="TINY"
        color={theme.text_02}
      >
        {store?.name}
      </Text>
    </MobilePageHeaderContainer>
  );
};

export default MobilePageHeader;
