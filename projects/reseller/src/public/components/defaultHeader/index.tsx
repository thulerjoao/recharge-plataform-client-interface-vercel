import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import BackArrow from "./icons//BackArrow.svg";
import { DefaultHeaderContainer } from "./style";
import { useAuth } from "context/auth";
import { useTheme } from "styled-components";

interface Props {
  backWard?: boolean;
  title: string;
}

const DefaultHeader = ({ backWard, title }: Props) => {
  const route = useRouter();
  const { store } = useAuth();
  const theme = useTheme();

  return (
    <DefaultHeaderContainer>
      {backWard && (
        <span onClick={() => route.back()} className="backArrow">
          <BackArrow />
        </span>
      )}
      <Text align="center" fontName="LARGE_SEMI_BOLD">
        {title}
      </Text>
      <Text
        align="center"
        className="storeName"
        fontName="SMALL_MEDIUM"
        color={theme.text_01}
      >
        {store?.name}
      </Text>
    </DefaultHeaderContainer>
  );
};

export default DefaultHeader;
