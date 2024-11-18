import { usePathname, useRouter } from "next/navigation";
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
import { AsideTabletBarContainer } from "./style";

const AsideBarTablet = () => {
  const route = useRouter();
  const currentRoute = usePathname();

  const handleClick = (prop: AsideSelected) => {
    route.push(`/${prop}`);
  };

  const handleCheck = (prop: AsideSelected) => {
    const propLenght: number = prop.length;
    return currentRoute.slice(0, propLenght + 1) === `/${prop}` ? 1 : 0;
  };

  return (
    <AsideTabletBarContainer>
      <aside className="mainContent">
        <Logo />
        <div
          onClick={() => handleClick("home")}
          className={`menuOption ${handleCheck("home") && "selected"}`}
          style={{ margin: "40px 0 16px 0" }}
        >
          {handleCheck("home") ? <HomeSelected /> : <Home />}
        </div>

        <div
          onClick={() => handleClick("sales")}
          className={`menuOption ${handleCheck("sales") && "selected"}`}
        >
          {handleCheck("sales") ? <SalesSelected /> : <Sales />}
        </div>

        <div
          onClick={() => handleClick("products")}
          className={`menuOption ${handleCheck("products") && "selected"}`}
        >
          {handleCheck("products") ? <ProductsSelected /> : <Products />}
        </div>

        <div
          onClick={() => handleClick("recharge")}
          className={`menuOption ${handleCheck("recharge") && "selected"}`}
        >
          {handleCheck("recharge") ? <RechargeSelected /> : <Recharge />}
        </div>

        <div
          onClick={() => handleClick("wallet")}
          className={`menuOption ${handleCheck("wallet") && "selected"}`}
        >
          {handleCheck("wallet") ? <WalletSelected /> : <Wallet />}
        </div>

        <div className="bottomOptions">
          <div
            onClick={() => handleClick("config")}
            className={`menuOption ${handleCheck("config") && "selected"}`}
          >
            {handleCheck("config") ? <GearSelected /> : <Gear />}
          </div>
          <div className="menuOption" onClick={() => route.replace("/")}>
            <Logout />
          </div>
        </div>
      </aside>
    </AsideTabletBarContainer>
  );
};

export default AsideBarTablet;
