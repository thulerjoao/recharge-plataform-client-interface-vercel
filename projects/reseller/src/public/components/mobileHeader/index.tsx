import { useRouter } from "next/navigation";
import { useState } from "react";
import { scrollToTop } from "utils/scrollToTopFunction";
import MobileMenu from "../mobileMenu";
import Logo from "./icons/Logo.svg";
import Menu from "./icons/Menu.svg";
import { MobileHeaderContainer } from "./style";

const MobiletHeader = () => {
  const route = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <MobileHeaderContainer openMenu={openMenu}>
      <section className="topCompoennt">
        <span onClick={() => scrollToTop()}>
          <Logo />
        </span>
        <span
          onClick={(event) => {
            event.preventDefault();
            setOpenMenu(!openMenu);
          }}
        >
          <Menu />
        </span>
      </section>
      {openMenu && <MobileMenu setOpenMenu={setOpenMenu} />}
    </MobileHeaderContainer>
  );
};

export default MobiletHeader;
