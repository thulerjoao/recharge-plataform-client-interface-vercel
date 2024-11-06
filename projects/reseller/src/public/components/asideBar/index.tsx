import Text from "@4miga/design-system/components/Text";
import { useState } from "react";
import Home from "./icons/Home.svg";
import Logo from "./icons/Logo.svg";
import Products from "./icons/Products.svg";
import Recharge from "./icons/Recharge.svg";
import Sell from "./icons/Sell.svg";
import Wallet from "./icons/Wallet.svg";
import Gear from "./icons/Gear.svg";
import Logout from "./icons/Logout.svg";
import { AsideBarContainer } from "./style";

type AsideSelected = "home" | "sell" | "products" | "recharge" | "wallet";

const AsideBar = () => {
  const [selected, setSelected] = useState<AsideSelected>("home");

  return (
    <AsideBarContainer>
      <Logo />
      <div style={{ margin: "40px 0 16px 0" }} className="menuOption">
        <span>
          <Home />
        </span>
        <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
          INÍCIO
        </Text>
      </div>
      <div className="menuOption">
        <span>
          <Sell />
        </span>
        <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
          VENDAS
        </Text>
      </div>
      <div className="menuOption">
        <span>
          <Products />
        </span>
        <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
          PRODUTOS
        </Text>
      </div>
      <div className="menuOption">
        <span>
          <Recharge />
        </span>
        <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
          RECARREGAR
        </Text>
      </div>
      <div className="menuOption">
        <span>
          <Wallet />
        </span>
        <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
          CARTEIRA
        </Text>
      </div>
      <section className="bottomOptions">
        <div className="menuOption">
          <span>
            <Gear />
          </span>
          <Text margin="0 0 0 16px" fontName="REGULAR_SEMI_BOLD">
            CONFIGURAÇÕES
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
      </section>
    </AsideBarContainer>
  );
};

export default AsideBar;
