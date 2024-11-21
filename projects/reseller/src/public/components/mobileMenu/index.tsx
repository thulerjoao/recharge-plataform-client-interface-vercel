import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
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
import { MobileMenuContainer } from "./style";

interface Props {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ openMenu, setOpenMenu }: Props) => {
  const route = useRouter();
  const currentRoute = usePathname();

  const handleClick = (prop: AsideSelected) => {
    route.push(`/${prop}`);
    setOpenMenu(false);
  };

  const handleCheck = (prop: AsideSelected) => {
    const propLenght: number = prop.length;
    return currentRoute.slice(0, propLenght + 1) === `/${prop}` ? 1 : 0;
  };

  return (
    <MobileMenuContainer openMenu={openMenu}>
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

      <div className="bottomOptions">
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
            CARTEIRA
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
      </div>
    </MobileMenuContainer>
  );
};

export default MobileMenu;
