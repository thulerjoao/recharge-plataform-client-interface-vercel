import Text from "@4miga/design-system/components/Text";
import { useAuth } from "context/auth";
import { useTheme } from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { AsideSelected } from "types/asideSelectedType";
import Admin from "../../icons/Admin.svg";
import AdminSelected from "../../icons/AdminSelected.svg";
import Customers from "../../icons/Clients.svg";
import CustomersSelected from "../../icons/ClientsSelected.svg";
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
  const theme = useTheme();
  const route = useRouter();
  const currentRoute = usePathname();

  const handleClickRouteTo = (prop: AsideSelected) => {
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
              color={handleCheck("dashboard") && theme.background_01}
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
              color={handleCheck("products") && theme.background_01}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PRODUTOS
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("orders")}
            className={`menuOption ${handleCheck("orders") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("orders") ? <OrdersSelected /> : <Orders />}
            </span>
            <Text
              color={handleCheck("orders") && theme.background_01}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PEDIDOS
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("customers")}
            className={`menuOption ${handleCheck("customers") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("customers") ? <CustomersSelected /> : <Customers />}
            </span>
            <Text
              color={handleCheck("customers") && theme.background_01}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              CLIENTES
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
              color={handleCheck("partners") && theme.background_01}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              PARCEIROS
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("coupons")}
            className={`menuOption ${handleCheck("coupons") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("coupons") ? <DiscountSelected /> : <Discount />}
            </span>
            <Text
              color={handleCheck("coupons") && theme.background_01}
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
              color={handleCheck("admin") && theme.background_01}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              ADMIN
            </Text>
          </div>

          <div
            onClick={() => handleClickRouteTo("settings")}
            className={`menuOption ${handleCheck("settings") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("settings") ? <GearSelected /> : <Gear />}
            </span>
            <Text
              color={handleCheck("settings") && theme.background_01}
              margin="0 0 0 16px"
              fontName="REGULAR_SEMI_BOLD"
              className="desktop"
            >
              LOJA
            </Text>
          </div>
          <div className="bottomOptions">
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
