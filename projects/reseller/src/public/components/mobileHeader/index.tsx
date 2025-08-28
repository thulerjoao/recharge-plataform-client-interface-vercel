import { useRouter } from "next/navigation";
import { useState } from "react";
import { scrollToTop } from "utils/scrollToTopFunction";
import { useDisableScroll } from "@4miga/hooks/useDisableScroll";
import MobileMenu from "../mobileMenu";
import MobileNavbar from "../navBarMenu";
import Logo from "./icons/Logo.svg";
import BackArrow from "./icons/BackArrow.svg";
import Menu from "./icons/Menu.svg";
import { MobileHeaderContainer } from "./style";

interface Props {
  search?: boolean;
}

const MobiletHeader = ({ search }: Props) => {
  const route = useRouter();
  const [openMenu, setOpenmenu] = useState<boolean>(false);

  useDisableScroll(openMenu);

  const handleBarClick = () => {
    openMenu ? setOpenmenu(false) : scrollToTop();
  };

  return (
    <MobileHeaderContainer openMenu={openMenu}>
      <section className="topCompoennt" onClick={() => handleBarClick()}>
        <span onClick={() => route.back()}>
          <BackArrow />
        </span>
        <span
          onClick={(event) => {
            event.preventDefault();
            setOpenmenu(!openMenu);
          }}
        >
          <Menu />
        </span>
      </section>
      {openMenu && (
        <MobileMenu
          search={search}
          openMenu={openMenu}
          setOpenMenu={setOpenmenu}
        />
      )}
      <MobileNavbar openMenu={openMenu} />
    </MobileHeaderContainer>
  );
};

export default MobiletHeader;
