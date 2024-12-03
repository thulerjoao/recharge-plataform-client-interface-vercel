import { useRouter } from "next/navigation";
import { useState } from "react";
import { scrollToTop } from "utils/scrollToTopFunction";
import useDisableScroll from "utils/useDisableScroll";
import MobileMenu from "../mobileMenu";
import Logo from "./icons/Logo.svg";
import Menu from "./icons/Menu.svg";
import { MobileHeaderContainer } from "./style";

interface Props {
  search?: boolean;
}

const MobiletHeader = ({ search }: Props) => {
  const route = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useDisableScroll({ isOpen: openMenu });

  return (
    <MobileHeaderContainer openMenu={openMenu}>
      <section
        className="topCompoennt"
        onClick={() => {
          openMenu && setOpenMenu(false);
        }}
      >
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
      {openMenu && (
        <MobileMenu
          search={search}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      )}
    </MobileHeaderContainer>
  );
};

export default MobiletHeader;
