import { usePathname, useRouter } from "next/navigation";
import { AsideSelected } from "types/asideSelectedType";
// import RechargeSelected from "../../icons/RechargeSelected.svg";
// import SalesSelected from "../../icons/SalesSelected.svg";
import Home from "../../icons/Home.svg";
import HomeSelected from "../../icons/HomeSelected.svg";
import Orders from "../../icons/Orders.svg";
import OrdersSelected from "../../icons/OrdersSelected.svg";
// import Recharge from "../../icons/Recharge.svg";
// import Sales from "../../icons/Sales.svg";
// import Wallet from "../../icons/Wallet.svg";
// import WalletSelected from "../../icons/WalletSelected.svg";
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
import { MobileNavBar } from "./style";

interface Props {
  openMenu: boolean;
}

const MobileNavbar = ({ openMenu }: Props) => {
  const currentRoute = usePathname();
  const pathName = usePathname();
  const route = useRouter();

  const handleCheck = (prop: AsideSelected) => {
    const propLenght: number = prop.length;
    return currentRoute.slice(0, propLenght + 1) === `/${prop}` ? 1 : 0;
  };

  const handleClick = (prop: AsideSelected) => {
    if (pathName === `/${prop}`) return scrollToTop();
    route.push(`/${prop}`);
  };

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
        onClick={() => handleClick("coupons")}
        className={handleCheck("coupons") && "selected"}
      >
        {handleCheck("coupons") ? <DiscountSelected /> : <Discount />}
      </span>
      <span
        onClick={() => handleClick("admin")}
        className={handleCheck("admin") && "selected"}
      >
        {handleCheck("admin") ? <AdminSelected /> : <Admin />}
      </span>
      <span
        onClick={() => handleClick("settings")}
        className={handleCheck("settings") && "selected"}
      >
        {handleCheck("settings") ? <GearSelected /> : <Gear />}
      </span>
    </MobileNavBar>
  );
};

export default MobileNavbar;
