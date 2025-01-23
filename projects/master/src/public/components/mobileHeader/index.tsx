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
  const [openmenu, setOpenmenu] = useState<boolean>(false);

  useDisableScroll({ isOpen: openmenu });

  const handleBarClick = () => {
    openmenu ? setOpenmenu(false) : scrollToTop();
  };

  return (
    <MobileHeaderContainer openMenu={openmenu}>
      <section className="topCompoennt" onClick={() => handleBarClick()}>
        <span onClick={() => route.push("/home")}>
          <Logo />
        </span>
        <span
          onClick={(event) => {
            event.preventDefault();
            setOpenmenu(!openmenu);
          }}
        >
          <Menu />
        </span>
      </section>
      {openmenu && (
        <MobileMenu
          search={search}
          openMenu={openmenu}
          setOpenMenu={setOpenmenu}
        />
      )}
    </MobileHeaderContainer>
  );
};

export default MobiletHeader;
