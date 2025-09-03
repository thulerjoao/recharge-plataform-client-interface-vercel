import { usePathname, useRouter } from "next/navigation";
import { AsideSelected } from "types/asideSelectedType";
// import RechargeSelected from "./icons/RechargeSelected.svg";
// import SalesSelected from "./icons/SalesSelected.svg";
// import HomeSelected from "./icons/HomeSelected.svg";
// import Home from "./icons/Home.svg";
// import Recharge from "./icons/Recharge.svg";
// import Sales from "./icons/Sales.svg";
// import Wallet from "./icons/Wallet.svg";
// import WalletSelected from "./icons/WalletSelected.svg";
import { MobileNavBar } from "./style";
import { scrollToTop } from "utils/scrollToTopFunction";
import Products from "./icons/Products.svg";
import ProductsSelected from "./icons/ProductsSelected.svg";
import Influencer from "./icons/Influencer.svg";
import InfluencerSelected from "./icons/InfluencerSelected.svg";
import Discount from "./icons/Discount.svg";
import DiscountSelected from "./icons/DiscountSelected.svg";

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
      {/* <span
        onClick={() => handleClick("home")}
        className={handleCheck("home") && "selected"}
      >
        {handleCheck("home") ? <HomeSelected /> : <Home />}
      </span>
      <span
        onClick={() => handleClick("sales")}
        className={handleCheck("sales") && "selected"}
      >
        {handleCheck("sales") ? <SalesSelected /> : <Sales />}
      </span>
      <span
        onClick={() => handleClick("produtos")}
        className={handleCheck("produtos") && "selected"}
      >
        {handleCheck("produtos") ? <ProductsSelected /> : <Products />}
      </span>
      <span
        onClick={() => handleClick("recharge")}
        className={handleCheck("recharge") && "selected"}
      >
        {handleCheck("recharge") ? <RechargeSelected /> : <Recharge />}
      </span>
      <span
        onClick={() => handleClick("wallet")}
        className={handleCheck("wallet") && "selected"}
      >
        {handleCheck("wallet") ? <WalletSelected /> : <Wallet />}
      </span> */}
      <span
        onClick={() => handleClick("produtos")}
        className={handleCheck("produtos") && "selected"}
      >
        {handleCheck("produtos") ? <ProductsSelected /> : <Products />}
      </span>
      <span
        onClick={() => handleClick("parceiros")}
        className={handleCheck("parceiros") && "selected"}
      >
        {handleCheck("parceiros") ? <InfluencerSelected /> : <Influencer />}
      </span>
      <span
        onClick={() => handleClick("cupons")}
        className={handleCheck("cupons") && "selected"}
      >
        {handleCheck("cupons") ? <DiscountSelected /> : <Discount />}
      </span>
    </MobileNavBar>
  );
};

export default MobileNavbar;
