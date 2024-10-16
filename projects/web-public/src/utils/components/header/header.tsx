"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import HeaderLogo from "./HeaderLogo.svg";
import { HeaderContainer } from "./style";

const Header = () => {
  return (
    <HeaderContainer>
      <div className="centerComponent">
        <span>
          <HeaderLogo />
        </span>
        <div className="loginContainer">
          <span className="loginButton">
            <Text
              align="start"
              fontType="SMALL_SEMI_BOLD"
              color={Theme.colors.mainlight}
            >
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