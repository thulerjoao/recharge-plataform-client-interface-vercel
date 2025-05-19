import { usePathname, useRouter } from "next/navigation";
import { AsideSelected } from "types/asideSelectedType";
import Home from "../../asideBar/icons/Home.svg";
import HomeSelected from "../../asideBar/icons/HomeSelected.svg";
import Products from "../../asideBar/icons/Products.svg";
import ProductsSelected from "../../asideBar/icons/ProductsSelected.svg";
import Recharge from "../../asideBar/icons/Recharge.svg";
import RechargeSelected from "../../asideBar/icons/RechargeSelected.svg";
import Sales from "../../asideBar/icons/Sales.svg";
import SalesSelected from "../../asideBar/icons/SalesSelected.svg";
import Wallet from "../../asideBar/icons/Wallet.svg";
import WalletSelected from "../../asideBar/icons/WalletSelected.svg";
import { MobileNavBar } from "./style";
import { routeModule } from "next/dist/build/templates/app-page";

interface Props {
  openMenu: boolean;
}

const MobileNavbar = ({ openMenu }: Props) => {
  const currentRoute = usePathname();
  const route = useRouter();

  const handleCheck = (prop: AsideSelected) => {
    const propLenght: number = prop.length;
    return currentRoute.slice(0, propLenght + 1) === `/${prop}` ? 1 : 0;
  };

  return (
    <MobileNavBar openMenu={openMenu}>
      <span
        onClick={() => route.push("/home")}
        className={handleCheck("home") && "selected"}
      >
        {handleCheck("home") ? <HomeSelected /> : <Home />}
      </span>
      <span
        onClick={() => route.push("/sales")}
        className={handleCheck("sales") && "selected"}
      >
        {handleCheck("sales") ? <SalesSelected /> : <Sales />}
      </span>
      <span
        onClick={() => route.push("/products")}
        className={handleCheck("products") && "selected"}
      >
        {handleCheck("products") ? <ProductsSelected /> : <Products />}
      </span>
      <span
        onClick={() => route.push("/recharge")}
        className={handleCheck("recharge") && "selected"}
      >
        {handleCheck("recharge") ? <RechargeSelected /> : <Recharge />}
      </span>
      <span
        onClick={() => route.push("/wallet")}
        className={handleCheck("wallet") && "selected"}
      >
        {handleCheck("wallet") ? <WalletSelected /> : <Wallet />}
      </span>
    </MobileNavBar>
  );
};

export default MobileNavbar;
