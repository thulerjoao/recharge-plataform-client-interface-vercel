import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AsideSelected } from "types/asideMenu.types";
import Gear from "../asideBar/icons/Gear.svg";
import GearSelected from "../asideBar/icons/GearSelected.svg";
import Home from "../asideBar/icons/Home.svg";
import HomeSelected from "../asideBar/icons/HomeSelected.svg";
import Logout from "../asideBar/icons/Logout.svg";
import Products from "../asideBar/icons/Products.svg";
import ProductsSelected from "../asideBar/icons/ProductsSelected.svg";
import Recharge from "../asideBar/icons/Recharge.svg";
import RechargeSelected from "../asideBar/icons/RechargeSelected.svg";
import Sales from "../asideBar/icons/Sales.svg";
import SalesSelected from "../asideBar/icons/SalesSelected.svg";
import Wallet from "../asideBar/icons/Wallet.svg";
import WalletSelected from "../asideBar/icons/WalletSelected.svg";
import SearchComponent from "../searchComponent";
import BigDown from "./icons/BigDown.svg";
import BigUp from "./icons/BigUp.svg";
import Search from "./icons/Search.svg";
import Setting from "./icons/Setting.svg";
import { MobileMenuContainer } from "./style";

interface Props {
  search: boolean;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ search, openMenu, setOpenMenu }: Props) => {
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
    <MobileMenuContainer openSearch={openSearch} openMenu={openMenu}>
      {search && (
        <section className="searchContainer">
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
        onClick={() => handleClick("home")}
        className={`menuOption ${handleCheck("home") && "selected"}`}
        style={{ margin: "32px 0 16px 0" }}
      >
        <span>{handleCheck("home") ? <HomeSelected /> : <Home />}</span>

        <Text
          color={handleCheck("home") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          INÍCIO
        </Text>
      </div>

      <div
        onClick={() => handleClick("sales")}
        className={`menuOption ${handleCheck("sales") && "selected"}`}
      >
        <span>{handleCheck("sales") ? <SalesSelected /> : <Sales />}</span>

        <Text
          color={handleCheck("sales") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          VENDAS
        </Text>
      </div>

      <div
        onClick={() => handleClick("products")}
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
        onClick={() => handleClick("recharge")}
        className={`menuOption ${handleCheck("recharge") && "selected"}`}
      >
        <span>
          {handleCheck("recharge") ? <RechargeSelected /> : <Recharge />}
        </span>

        <Text
          color={handleCheck("recharge") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          RECARREGAR
        </Text>
      </div>

      <div
        onClick={() => handleClick("wallet")}
        className={`menuOption ${handleCheck("wallet") && "selected"}`}
      >
        <span>{handleCheck("wallet") ? <WalletSelected /> : <Wallet />}</span>

        <Text
          color={handleCheck("wallet") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          CARTEIRA
        </Text>
      </div>
      <div
        onClick={() => handleClick("config")}
        className={`menuOption ${handleCheck("config") && "selected"}`}
      >
        <span>{handleCheck("config") ? <GearSelected /> : <Gear />}</span>

        <Text
          color={handleCheck("config") && Theme.colors.maindark}
          margin="0 0 0 16px"
          fontName="REGULAR_SEMI_BOLD"
        >
          CONFIGURAÇÕES
        </Text>
      </div>
      <div className="menuOption" onClick={() => route.replace("/")}>
        <span>
          <Logout />
        </span>
        <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
          SAIR
        </Text>
      </div>
      {/* <div className="bottomOptions">
        <div
          onClick={() => handleClick("config")}
          className={`menuOption ${handleCheck("config") && "selected"}`}
        >
          <span>{handleCheck("config") ? <GearSelected /> : <Gear />}</span>

          <Text
            color={handleCheck("config") && Theme.colors.maindark}
            margin="0 0 0 16px"
            fontName="REGULAR_SEMI_BOLD"
          >
            CONFIGURAÇÕES
          </Text>
        </div>
        <div className="menuOption" onClick={() => route.replace("/")}>
          <span>
            <Logout />
          </span>
          <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
            SAIR
          </Text>
        </div>
      </div> */}
    </MobileMenuContainer>
  );
};

export default MobileMenu;
