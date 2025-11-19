import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "context/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AsideSelected } from "types/asideSelectedType";
import Gear from "../../icons/Gear.svg";
import GearSelected from "../../icons/GearSelected.svg";
import Logout from "../../icons/Logout.svg";
import Products from "../../icons/Products.svg";
import ProductsSelected from "../../icons/ProductsSelected.svg";
import SearchComponent from "../searchComponent";
import BigDown from "./icons/BigDown.svg";
import BigUp from "./icons/BigUp.svg";
import Search from "./icons/Search.svg";
import Setting from "./icons/Setting.svg";
import { MobileMenuContainer } from "./style";

import Admin from "../../icons/Admin.svg";
import AdminSelected from "../../icons/AdminSelected.svg";
import Discount from "../../icons/Discount.svg";
import DiscountSelected from "../../icons/DiscountSelected.svg";
import InfluencerSelected from "../../icons/GearSelected.svg";
import Home from "../../icons/Home.svg";
import HomeSelected from "../../icons/HomeSelected.svg";
import Influencer from "../../icons/Influencer.svg";
import Orders from "../../icons/Orders.svg";
import OrdersSelected from "../../icons/OrdersSelected.svg";

interface Props {
  search: boolean;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ search, openMenu, setOpenMenu }: Props) => {
  const { logout } = useAuth();
  const route = useRouter();
  const currentRoute = usePathname();

  const [searchText, setSearchText] = useState<string>("");
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const handleClick = (prop: AsideSelected) => {
    route.push(`/${prop}`);
    const propLenght: number = prop.length;
    currentRoute.slice(0, propLenght + 1) === `/${prop}` && setOpenMenu(false);
  };

  const handleCheck = (prop: AsideSelected) => {
    const propLenght: number = prop.length;
    return currentRoute.slice(0, propLenght + 1) === `/${prop}` ? 1 : 0;
  };

  return (
    <MobileMenuContainer
      openSearch={openSearch}
      openMenu={openMenu}
      onClick={() => setOpenMenu(false)}
    >
      {search && (
        <section
          className="searchContainer"
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            padding="0 44px 0 16px"
            rightElement={<Search />}
            placeholder="Pesquisar..."
            height={40}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div
            onClick={() => setOpenSearch(!openSearch)}
            className={`filter ${openSearch && "opened"}`}
          >
            <span>
              <Setting />
            </span>
            <Text margin="0 0 0 16px" align="start" fontName="SMALL">
              FILTRAR
            </Text>
            <span onClick={() => setOpenSearch(!openSearch)}>
              {openSearch ? <BigUp /> : <BigDown />}
            </span>
          </div>
          {openSearch && (
            <div className="search">
              <SearchComponent />
            </div>
          )}
        </section>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick("dashboard");
        }}
        className={`menuOption ${handleCheck("dashboard") && "selected"}`}
        style={{ margin: "32px 0 16px 0" }}
      >
        <span>{handleCheck("dashboard") ? <HomeSelected /> : <Home />}</span>

        <Text
          color={handleCheck("dashboard") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          PAINEL
        </Text>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick("products");
        }}
        className={`menuOption ${handleCheck("products") && "selected"}`}
      >
        <span>
          {handleCheck("products") ? <ProductsSelected /> : <Products />}
        </span>

        <Text
          color={handleCheck("products") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          PRODUTOS
        </Text>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick("orders");
        }}
        className={`menuOption ${handleCheck("orders") && "selected"}`}
      >
        <span>{handleCheck("orders") ? <OrdersSelected /> : <Orders />}</span>

        <Text
          color={handleCheck("orders") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          PEDIDOS
        </Text>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick("partners");
        }}
        className={`menuOption ${handleCheck("partners") && "selected"}`}
      >
        <span>
          {handleCheck("partners") ? <InfluencerSelected /> : <Influencer />}
        </span>

        <Text
          color={handleCheck("partners") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          PARCEIROS
        </Text>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick("coupons");
        }}
        className={`menuOption ${handleCheck("coupons") && "selected"}`}
      >
        <span>
          {handleCheck("coupons") ? <DiscountSelected /> : <Discount />}
        </span>

        <Text
          color={handleCheck("coupons") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          CUPONS
        </Text>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick("admin");
        }}
        className={`menuOption ${handleCheck("admin") && "selected"}`}
      >
        <span>{handleCheck("admin") ? <AdminSelected /> : <Admin />}</span>

        <Text
          color={handleCheck("admin") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          ADMIN
        </Text>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleClick("settings");
        }}
        className={`menuOption ${handleCheck("settings") && "selected"}`}
      >
        <span>{handleCheck("settings") ? <GearSelected /> : <Gear />}</span>

        <Text
          color={handleCheck("settings") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          LOJA
        </Text>
      </div>
      <div className="menuOption" onClick={() => logout()}>
        <span>
          <Logout />
        </span>
        <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
          SAIR
        </Text>
      </div>
    </MobileMenuContainer>
  );
};

export default MobileMenu;
