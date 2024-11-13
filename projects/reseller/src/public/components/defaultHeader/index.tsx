import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import BackArrow from "./icons//BackArrow.svg";
import { DefaultHeaderContainer } from "./style";

interface Props {
  title: string;
}

const DefaultHeader = ({ title }: Props) => {
  const route = useRouter();

  return (
    <DefaultHeaderContainer>
      <span onClick={() => route.back()} className="backArrow">
        <BackArrow />
      </span>
      <Text align="center" fontName="LARGE_SEMI_BOLD">
        {title}
      </Text>
    </DefaultHeaderContainer>
  );
};

export default DefaultHeader;
