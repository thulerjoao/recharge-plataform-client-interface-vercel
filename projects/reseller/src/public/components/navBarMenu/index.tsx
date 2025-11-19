import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AsideSelected } from "types/asideSelectedType";
import Home from "../../icons/Home.svg";
import HomeSelected from "../../icons/HomeSelected.svg";
import Orders from "../../icons/Orders.svg";
import OrdersSelected from "../../icons/OrdersSelected.svg";
import { scrollToTop } from "utils/scrollToTopFunction";
import Admin from "../../icons/Admin.svg";
import AdminSelected from "../../icons/AdminSelected.svg";
import Discount from "../../icons/Discount.svg";
import DiscountSelected from "../../icons/DiscountSelected.svg";
import Gear from "../../icons/Gear.svg";
import GearSelected from "../../icons/GearSelected.svg";
import Influencer from "../../icons/Influencer.svg";
import InfluencerSelected from "../../icons/InfluencerSelected.svg";
import Products from "../../icons/Products.svg";
import ProductsSelected from "../../icons/ProductsSelected.svg";
import More from "./icons/More.svg";
import MoreSelected from "./icons/MoreSelected.svg";
import { MobileNavBar, MoreMenuPopover, MoreMenuItem } from "./style";

interface Props {
  openMenu: boolean;
}

const MobileNavbar = ({ openMenu }: Props) => {
  const currentRoute = usePathname();
  const pathName = usePathname();
  const route = useRouter();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const handleCheck = (prop: AsideSelected) => {
    const propLenght: number = prop.length;
    return currentRoute.slice(0, propLenght + 1) === `/${prop}` ? 1 : 0;
  };

  const handleClick = (prop: AsideSelected) => {
    if (pathName === `/${prop}`) return scrollToTop();
    route.push(`/${prop}`);
    setShowMoreMenu(false);
  };

  const handleMoreClick = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  // Fechar o menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMoreMenu]);

  // Itens do menu "Mais"
  const moreMenuItems = [
    {
      route: "coupons" as AsideSelected,
      icon: Discount,
      iconSelected: DiscountSelected,
      label: "Cupons",
    },
    {
      route: "admin" as AsideSelected,
      icon: Admin,
      iconSelected: AdminSelected,
      label: "Admin",
    },
    {
      route: "settings" as AsideSelected,
      icon: Gear,
      iconSelected: GearSelected,
      label: "Configurações",
    },
  ];

  // Verifica se alguma das rotas do menu "Mais" está ativa
  const isMoreMenuActive = moreMenuItems.some((item) =>
    handleCheck(item.route),
  );

  return (
    <MobileNavBar openMenu={openMenu}>
      <span
        onClick={() => handleClick("dashboard")}
        className={handleCheck("dashboard") && "selected"}
      >
        {handleCheck("dashboard") ? <HomeSelected /> : <Home />}
      </span>
      <span
        onClick={() => handleClick("products")}
        className={handleCheck("products") && "selected"}
      >
        {handleCheck("products") ? <ProductsSelected /> : <Products />}
      </span>
      <span
        onClick={() => handleClick("orders")}
        className={handleCheck("orders") && "selected"}
      >
        {handleCheck("orders") ? <OrdersSelected /> : <Orders />}
      </span>
      <span
        onClick={() => handleClick("partners")}
        className={handleCheck("partners") && "selected"}
      >
        {handleCheck("partners") ? <InfluencerSelected /> : <Influencer />}
      </span>
      <span
        ref={moreMenuRef}
        onClick={handleMoreClick}
        className={`more-button ${showMoreMenu || isMoreMenuActive ? "selected" : ""}`}
      >
        {showMoreMenu || isMoreMenuActive ? <MoreSelected /> : <More />}
        {showMoreMenu && (
          <MoreMenuPopover>
            {moreMenuItems.map((item) => (
              <MoreMenuItem
                key={item.route}
                onClick={() => handleClick(item.route)}
                className={handleCheck(item.route) && "selected"}
              >
                {handleCheck(item.route) ? (
                  <item.iconSelected />
                ) : (
                  <item.icon />
                )}
                <span>{item.label}</span>
              </MoreMenuItem>
            ))}
          </MoreMenuPopover>
        )}
      </span>
    </MobileNavBar>
  );
};

export default MobileNavbar;
