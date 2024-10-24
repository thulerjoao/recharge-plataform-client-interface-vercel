"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import HeaderLogo from "./icons/HeaderLogo.svg";
import { HeaderContainer } from "./style";

const Header = () => {
  const route = useRouter();
  return (
    <HeaderContainer>
      <div className="centerComponent">
        <span className="mainLogo" onClick={() => route.push("/home")}>
          <HeaderLogo />
        </span>
        <div className="loginContainer">
          <span className="loginButton">
            <Text align="start" fontName="SMALL_SEMI_BOLD">
              Entrar
            </Text>
          </span>
          <span>
            <Button width={98} height={28} title="Cadastre-se" />
          </span>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
