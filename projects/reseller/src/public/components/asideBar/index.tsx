import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "context/auth";
import { usePathname, useRouter } from "next/navigation";
import { AsideSelected } from "types/asideSelectedType";
import Admin from "../../icons/Admin.svg";
import AdminSelected from "../../icons/AdminSelected.svg";
import Discount from "../../icons/Discount.svg";
import DiscountSelected from "../../icons/DiscountSelected.svg";
import Gear from "../../icons/Gear.svg";
import GearSelected from "../../icons/GearSelected.svg";
import Home from "../../icons/Home.svg";
import HomeSelected from "../../icons/HomeSelected.svg";
import Influencer from "../../icons/Influencer.svg";
import InfluencerSelected from "../../icons/InfluencerSelected.svg";
import LogoDesktop from "../../icons/LogoDesktop.svg";
import LogoTablet from "../../icons/LogoTablet.svg";
import Logout from "../../icons/Logout.svg";
import Orders from "../../icons/Orders.svg";
import OrdersSelected from "../../icons/OrdersSelected.svg";
import Products from "../../icons/Products.svg";
import ProductsSelected from "../../icons/ProductsSelected.svg";
import { AsideBarContainer } from "./style";

const AsideBar = () => {
  const route = useRouter();
  const currentRoute = usePathname();

  const handleClickRouteTo = (prop: string) => {
    route.push(`/${prop}`);
  };

  const handleCheck = (prop: AsideSelected) => {
    const propLenght: number = prop.length;
    return currentRoute.slice(0, propLenght + 1) === `/${prop}` ? 1 : 0;
  };

  const { logout } = useAuth();

  return (
    <AsideBarContainer>
      <section className="CenterContent">
        <aside className="mainContent">
          <span className="desktop" onClick={() => route.push("/dashboard")}>
            <LogoDesktop />
          </span>

          <span className="tablet" onClick={() => route.push("/dashboard")}>
            <LogoTablet />
          </span>

          <div
            onClick={() => handleClickRouteTo("dashboard")}
            className={`menuOption ${handleCheck("dashboard") && "selected"}`}
            style={{ margin: "40px 0 0px 0" }}
          >
            <span className="inconEnviroment">
              {handleCheck("dashboard") ? <HomeSelected /> : <Home />}
            </span>
            <Text
              color={handleCheck("dashboard") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PAINEL
            </Text>
          </div>
          <div
            onClick={() => handleClickRouteTo("products")}
            className={`menuOption ${handleCheck("products") && "selected"}`}
            style={{ margin: "16px 0 16px 0" }}
          >
            <span className="inconEnviroment">
              {handleCheck("products") ? <ProductsSelected /> : <Products />}
            </span>
            <Text
              color={handleCheck("products") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PRODUTOS
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("orders?page=1")}
            className={`menuOption ${handleCheck("orders") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("orders") ? <OrdersSelected /> : <Orders />}
            </span>
            <Text
              color={handleCheck("orders") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PEDIDOS
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("partners")}
            className={`menuOption ${handleCheck("partners") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("partners") ? (
                <InfluencerSelected />
              ) : (
                <Influencer />
              )}
            </span>
            <Text
              color={handleCheck("partners") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PARCEIROS
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("coupons?page=1")}
            className={`menuOption ${handleCheck("coupons") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("coupons") ? <DiscountSelected /> : <Discount />}
            </span>
            <Text
              color={handleCheck("coupons") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              CUPONS
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("admin")}
            className={`menuOption ${handleCheck("admin") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("admin") ? <AdminSelected /> : <Admin />}
            </span>
            <Text
              color={handleCheck("admin") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              ADMIN
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("store")}
            className={`menuOption ${handleCheck("store") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("store") ? <GearSelected /> : <Gear />}
            </span>
            <Text
              color={handleCheck("store") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              LOJA
            </Text>
          </div>

          {/* <div
            onClick={() => handleClick("recharge")}
            className={`menuOption ${handleCheck("recharge") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("recharge") ? <RechargeSelected /> : <Recharge />}
            </span>
            <Text
              color={handleCheck("recharge") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              RECARREGAR
            </Text>
          </div> */}

          {/* <div
            onClick={() => handleClick("wallet")}
            className={`menuOption ${handleCheck("wallet") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("wallet") ? <WalletSelected /> : <Wallet />}
            </span>
            <Text
              color={handleCheck("wallet") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              CARTEIRA
            </Text>
          </div> */}

          <div className="bottomOptions">
            {/* <div
              onClick={() => handleClick("config")}
              className={`menuOption ${handleCheck("config") && "selected"}`}
            >
              <span className="inconEnviroment">
                {handleCheck("config") ? <GearSelected /> : <Gear />}
              </span>
              <Text
                color={handleCheck("config") && Theme.colors.maindark}
                margin="0 0 0 16px"
                fontName="REGULAR_SEMI_BOLD"
                className="desktop"
              >
                CONFIGURAÇÕES
              </Text>
            </div> */}
            <div className="menuOption" onClick={() => logout()}>
              <span className="inconEnviroment">
                <Logout />
              </span>
              <Text
                margin="0 0 0 16px"
                fontName="REGULAR_SEMI_BOLD"
                className="desktop"
              >
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
