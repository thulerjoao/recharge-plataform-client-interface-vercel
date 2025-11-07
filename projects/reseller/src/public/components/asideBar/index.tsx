import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "context/auth";
import { usePathname, useRouter } from "next/navigation";
import { AsideSelected } from "types/asideSelectedType";
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
import Products from "../../icons/Products.svg";
import ProductsSelected from "../../icons/ProductsSelected.svg";
import Sales from "../../icons/Sales.svg";
import SalesSelected from "../../icons/SalesSelected.svg";
import Wallet from "../../icons/Wallet.svg";
import AdminSelected from "../../icons/AdminSelected.svg";
import Admin from "../../icons/Admin.svg";
import OrdersSelected from "../../icons/OrdersSelected.svg";
import Orders from "../../icons/Orders.svg";
import WalletSelected from "../../icons/WalletSelected.svg";
import { AsideBarContainer } from "./style";

const AsideBar = () => {
  const route = useRouter();
  const currentRoute = usePathname();

  const handleClick = (prop: AsideSelected) => {
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
          <span className="desktop" onClick={() => route.push("/home")}>
            <LogoDesktop />
          </span>

          <span className="tablet" onClick={() => route.push("/home")}>
            <LogoTablet />
          </span>

          {/* <div
            onClick={() => handleClick("home")}
            className={`menuOption ${handleCheck("home") && "selected"}`}
            style={{ margin: "40px 0 16px 0" }}
          >
            <span className="inconEnviroment">
              {handleCheck("home") ? <HomeSelected /> : <Home />}
            </span>
            <Text
              color={handleCheck("home") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              INÍCIO
            </Text>
          </div> */}

          {/* <div
            onClick={() => handleClick("sales")}
            className={`menuOption ${handleCheck("sales") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("sales") ? <SalesSelected /> : <Sales />}
            </span>

            <Text
              color={handleCheck("sales") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              VENDAS
            </Text>
          </div> */}

          <div
            onClick={() => handleClick("produtos")}
            className={`menuOption ${handleCheck("produtos") && "selected"}`}
            style={{ margin: "40px 0 16px 0" }}
          >
            <span className="inconEnviroment">
              {handleCheck("produtos") ? <ProductsSelected /> : <Products />}
            </span>
            <Text
              color={handleCheck("produtos") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PRODUTOS
            </Text>
          </div>

          <div
            onClick={() => handleClick("pedidos")}
            className={`menuOption ${handleCheck("pedidos") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("pedidos") ? <OrdersSelected /> : <Orders />}
            </span>
            <Text
              color={handleCheck("pedidos") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PEDIDOS
            </Text>
          </div>

          <div
            onClick={() => handleClick("parceiros")}
            className={`menuOption ${handleCheck("parceiros") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("parceiros") ? (
                <InfluencerSelected />
              ) : (
                <Influencer />
              )}
            </span>
            <Text
              color={handleCheck("parceiros") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PARCEIROS
            </Text>
          </div>

          <div
            onClick={() => handleClick("cupons")}
            className={`menuOption ${handleCheck("cupons") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("cupons") ? <DiscountSelected /> : <Discount />}
            </span>
            <Text
              color={handleCheck("cupons") && Theme.colors.maindark}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              CUPONS
            </Text>
          </div>

          <div
            onClick={() => handleClick("admin")}
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
            onClick={() => handleClick("loja")}
            className={`menuOption ${handleCheck("loja") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("loja") ? <GearSelected /> : <Gear />}
            </span>
            <Text
              color={handleCheck("loja") && Theme.colors.maindark}
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
