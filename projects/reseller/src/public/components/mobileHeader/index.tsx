import { useRouter } from "next/navigation";
import { useState } from "react";
import { scrollToTop } from "utils/scrollToTopFunction";
import useDisableScroll from "utils/useDisableScroll";
import Home from "../asideBar/icons/Home.svg";
import Products from "../asideBar/icons/Products.svg";
import Recharge from "../asideBar/icons/Recharge.svg";
import Sales from "../asideBar/icons/Sales.svg";
import Wallet from "../asideBar/icons/Wallet.svg";
import MobileMenu from "../mobileMenu";
import Logo from "./icons/Logo.svg";
import Menu from "./icons/Menu.svg";
import { MobileHeaderContainer } from "./style";

interface Props {
  search?: boolean;
}

const MobiletHeader = ({ search }: Props) => {
  const route = useRouter();
  const [openMenu, setOpenmenu] = useState<boolean>(false);

  useDisableScroll({ isOpen: openMenu });

  const handleBarClick = () => {
    openMenu ? setOpenmenu(false) : scrollToTop();
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
            setOpenmenu(!openMenu);
          }}
        >
          <Menu />
        </span>
      </section>
      <section className="navBar">
        <span>
          <Home />
        </span>
        <span>
          <Sales />
        </span>
        <span>
          <Products />
        </span>
        <span>
          <Recharge />
        </span>
        <span>
          <Wallet />
        </span>
      </section>
      {openMenu && (
        <MobileMenu
          search={search}
          openMenu={openMenu}
          setOpenMenu={setOpenmenu}
        />
      )}
    </MobileHeaderContainer>
  );
};

export default MobiletHeader;
