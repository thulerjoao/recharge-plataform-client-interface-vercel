import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AsideSelected } from "types/asideMenu.types";
import Gear from "./icons/Gear.svg";
import GearSelected from "./icons/GearSelected.svg";
import Home from "./icons/Home.svg";
import HomeSelected from "./icons/HomeSelected.svg";
import Logo from "./icons/Logo.svg";
import Logout from "./icons/Logout.svg";
import Products from "./icons/Products.svg";
import ProductsSelected from "./icons/ProductsSelected.svg";
import Recharge from "./icons/Recharge.svg";
import RechargeSelected from "./icons/RechargeSelected.svg";
import Sales from "./icons/Sales.svg";
import SalesSelected from "./icons/SalesSelected.svg";
import Wallet from "./icons/Wallet.svg";
import WalletSelected from "./icons/WalletSelected.svg";
import { AsideBarContainer } from "./style";

const AsideBar = () => {
  const route = useRouter();
  const currentRoute = usePathname();
  const [selected, setSelected] = useState<string>(currentRoute);

  const handleClick = (prop: AsideSelected) => {
    setSelected(prop);
    route.replace(`/${prop}`);
  };

  const handleCheck = (prop: AsideSelected) => {
    return selected === `/${prop}` ? 1 : 0;
  };

  return (
    <AsideBarContainer>
      <section className="CenterContent">
        <aside className="mainContent">
          <Logo />
          <div
            onClick={() => handleClick("home")}
            className={`menuOption ${handleCheck("home") && "selected"}`}
            style={{ margin: "40px 0 16px 0" }}
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
            <span>
              {handleCheck("wallet") ? <WalletSelected /> : <Wallet />}
            </span>
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
            <div className="menuOption">
              <span>
                <Logout />
              </span>
              <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
                SAIR
              </Text>
            </div>
          </div>
        </aside>
      </section>
    </AsideBarContainer>
  );
};

export default AsideBar;
