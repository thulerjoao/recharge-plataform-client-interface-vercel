import { useRouter } from "next/navigation";
import { scrollToTop } from "utils/scrollToTopFunction";
import Logo from "./icons/Logo.svg";
import Menu from "./icons/Menu.svg";
import { MobileHeaderContainer } from "./style";

const MobiletHeader = () => {
  const route = useRouter();

  return (
    <MobileHeaderContainer>
      <span onClick={() => scrollToTop()}>
        <Logo />
      </span>
      <span>
        <Menu />
      </span>
    </MobileHeaderContainer>
  );
};

export default MobiletHeader;
