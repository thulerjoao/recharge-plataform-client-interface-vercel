import Text from "@4miga/design-system/components/Text";
import { usePathname, useRouter } from "next/navigation";
import BackArrow from "./icons/BackArrow.svg";
import { MobileSecondaryMenuContainer } from "./style";

interface Props {
  title: string;
}

const MobileSecondaryMenu = ({ title }: Props) => {
  const route = useRouter();

  return (
    <MobileSecondaryMenuContainer>
      <span onClick={() => route.back()} className="backWard">
        <BackArrow />
      </span>
      <Text align="center" fontName="LARGE_SEMI_BOLD">
        {title}
      </Text>
    </MobileSecondaryMenuContainer>
  );
};

export default MobileSecondaryMenu;
