import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
import { usePathname, useRouter } from "next/navigation";
import { AsideSelected } from "types/globalTypes";
import Gear from "./icons/Gear.svg";
import GearSelected from "./icons/GearSelected.svg";
import Home from "./icons/Home.svg";
import HomeSelected from "./icons/HomeSelected.svg";
import LogoDesktop from "./icons/LogoDesktop.svg";
import LogoTablet from "./icons/LogoTablet.svg";
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
import { useAuth } from "context/auth";

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

  const { device } = useDevice();
  const { logout } = useAuth();

  return (
    <AsideBarContainer>
      <section className="CenterContent">
        <aside className="mainContent">
          {device === "desktop" ? (
            <span onClick={() => route.push("/home")}>
              <LogoDesktop />
            </span>
          ) : (
            <span onClick={() => route.push("/home")}>
              <LogoTablet />
            </span>
          )}
          <div
            onClick={() => handleClick("home")}
            className={`menuOption ${handleCheck("home") && "selected"}`}
            style={{ margin: "40px 0 16px 0" }}
          >
            <span className="inconEnviroment">
              {handleCheck("home") ? <HomeSelected /> : <Home />}
            </span>
            {device === "desktop" && (
              <Text
                color={handleCheck("home") && Theme.colors.maindark}
                margin="0 0 0 16px"
                fontName="REGULAR_SEMI_BOLD"
              >
                INÍCIO
              </Text>
            )}
          </div>

          <div
            onClick={() => handleClick("sales")}
            className={`menuOption ${handleCheck("sales") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("sales") ? <SalesSelected /> : <Sales />}
            </span>
            {device === "desktop" && (
              <Text
                color={handleCheck("sales") && Theme.colors.maindark}
                margin="0 0 0 16px"
                fontName="REGULAR_SEMI_BOLD"
              >
                VENDAS
              </Text>
            )}
          </div>

          <div
            onClick={() => handleClick("products")}
            className={`menuOption ${handleCheck("products") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("products") ? <ProductsSelected /> : <Products />}
            </span>
            {device === "desktop" && (
              <Text
                color={handleCheck("products") && Theme.colors.maindark}
                margin="0 0 0 16px"
                fontName="REGULAR_SEMI_BOLD"
              >
                PRODUTOS
              </Text>
            )}
          </div>

          <div
            onClick={() => handleClick("recharge")}
            className={`menuOption ${handleCheck("recharge") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("recharge") ? <RechargeSelected /> : <Recharge />}
            </span>
            {device === "desktop" && (
              <Text
                color={handleCheck("recharge") && Theme.colors.maindark}
                margin="0 0 0 16px"
                fontName="REGULAR_SEMI_BOLD"
              >
                RECARREGAR
              </Text>
            )}
          </div>

          <div
            onClick={() => handleClick("wallet")}
            className={`menuOption ${handleCheck("wallet") && "selected"}`}
          >
            <span className="inconEnviroment">
              {handleCheck("wallet") ? <WalletSelected /> : <Wallet />}
            </span>
            {device === "desktop" && (
              <Text
                color={handleCheck("wallet") && Theme.colors.maindark}
                margin="0 0 0 16px"
                fontName="REGULAR_SEMI_BOLD"
              >
                CARTEIRA
              </Text>
            )}
          </div>

          <div className="bottomOptions">
            <div
              onClick={() => handleClick("config")}
              className={`menuOption ${handleCheck("config") && "selected"}`}
            >
              <span className="inconEnviroment">
                {handleCheck("config") ? <GearSelected /> : <Gear />}
              </span>
              {device === "desktop" && (
                <Text
                  color={handleCheck("config") && Theme.colors.maindark}
                  margin="0 0 0 16px"
                  fontName="REGULAR_SEMI_BOLD"
                >
                  CONFIGURAÇÕES
                </Text>
              )}
            </div>
            <div className="menuOption" onClick={() => route.replace("/")}>
              <span className="inconEnviroment">
                <Logout />
              </span>
              {device === "desktop" && (
                <Text
                  onClick={() => logout()}
                  margin="0 0 0 16px"
                  fontName="REGULAR_SEMI_BOLD"
                >
                  SAIR
                </Text>
              )}
            </div>
          </div>
        </aside>
      </section>
    </AsideBarContainer>
  );
};

export default AsideBar;
