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

  const handleBarClick = () => {
    openMenu ? setOpenMenu(false) : scrollToTop();
  };

  return (
    <MobileHeaderContainer openMenu={openMenu}>
      <section className="topCompoennt" onClick={() => handleBarClick()}>
        <span onClick={() => route.push("/home")}>
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
