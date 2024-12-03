"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useAuth } from "contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoginModal from "@4miga/design-system/components/loginModal";
import Exit from "./icons/Exit.svg";
import HeaderLogo from "./icons/HeaderLogo.svg";
import Product from "./icons/Products.svg";
import Profile from "./icons/Profile.svg";
import { HeaderContainer, MenuComponent } from "./style";

const Header = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [openInNewAccount, setOpenInNewAccount] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { logged, handleLogout, handleLogin } = useAuth();
  const route = useRouter();
  const modalRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div
            className="loginContainer name"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className="loginButton">
              <Text align="start" fontName="SMALL_SEMI_BOLD">
                Luiz Silva Santos
              </Text>
            </span>
            <Profile />
          </div>
        )}
        {openMenu && (
          <MenuComponent ref={modalRef}>
            <span className="square" />
            <div
              onClick={() => {
                route.push("/my-orders");
                setOpenMenu(false);
              }}
            >
              <span>
                <Product />
              </span>
              <Text nowrap fontName="SMALL">
                Minhas compras
              </Text>
            </div>
            <div
              onClick={() => {
                handleLogout();
                route.push("/home");
                setOpenMenu(false);
              }}
            >
              <span>
                <Exit />
              </span>
              <Text fontName="SMALL">Sair</Text>
            </div>
          </MenuComponent>
        )}
      </div>
      {loginModal && (
        <LoginModal
          handleLogin={handleLogin}
          openInNewAccount={openInNewAccount}
          loginModal={loginModal}
          setLoginModal={setLoginModal}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
