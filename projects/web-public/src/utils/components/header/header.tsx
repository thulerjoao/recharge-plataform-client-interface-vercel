"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import HeaderLogo from "./icons/HeaderLogo.svg";
import Profile from "./icons/Profile.svg";
import { HeaderContainer } from "./style";

const Header = () => {
  const logged: boolean = false;

  const route = useRouter();
  return (
    <HeaderContainer>
      <div className="centerComponent">
        <span className="mainLogo" onClick={() => route.push("/home")}>
          <HeaderLogo />
        </span>
        {logged ? (
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
        ) : (
          <div className="loginContainer">
            <span className="loginButton name">
              <Text align="start" fontName="SMALL_SEMI_BOLD">
                Luiz Silva Santos
              </Text>
            </span>
            <Profile />
          </div>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
