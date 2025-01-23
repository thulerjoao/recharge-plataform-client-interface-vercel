import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import BackArrow from "./icons//BackArrow.svg";
import { DefaultHeaderContainer } from "./style";

interface Props {
  backWard?: boolean;
  title: string;
}

const DefaultHeader = ({ backWard, title }: Props) => {
  const route = useRouter();

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
    </DefaultHeaderContainer>
  );
};

export default DefaultHeader;
