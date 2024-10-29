"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useAuth } from "contexts/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginModal from "../loginModal";
import HeaderLogo from "./icons/HeaderLogo.svg";
import Profile from "./icons/Profile.svg";
import { HeaderContainer } from "./style";

const Header = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [openInNewAccount, setOpenInNewAccount] = useState<boolean>(false);
  const { logged } = useAuth();
  const route = useRouter();

  const handleOpenLogin = (isNewAccount: boolean) => {
    setOpenInNewAccount(isNewAccount);
    setLoginModal(true);
  };

  return (
    <HeaderContainer>
      <div className="centerComponent">
        <span className="mainLogo" onClick={() => route.push("/home")}>
          <HeaderLogo />
        </span>
        {!logged ? (
          <div className="loginContainer">
            <span
              className="loginButton getIn"
              onClick={() => handleOpenLogin(false)}
            >
              <Text align="start" fontName="SMALL_SEMI_BOLD">
                Entrar
              </Text>
            </span>
            <span>
              <Button
                onClick={() => handleOpenLogin(true)}
                width={98}
                height={28}
                title="Cadastre-se"
              />
            </span>
          </div>
        ) : (
          <div className="loginContainer name">
            <span className="loginButton">
              <Text align="start" fontName="SMALL_SEMI_BOLD">
                Luiz Silva Santos
              </Text>
            </span>
            <Profile />
          </div>
        )}
      </div>
      {loginModal && (
        <LoginModal
          openInNewAccount={openInNewAccount}
          loginModal={loginModal}
          setLoginModal={setLoginModal}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
