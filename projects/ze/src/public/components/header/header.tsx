"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useAuth } from "contexts/auth";
import { useOrders } from "contexts/orders";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "utils/scrollToTopFunction";
import LoginModal from "../loginModal";
import Exit from "./icons/Exit.svg";
import Gear from "./icons/Gear.svg";
import HeaderLogo from "./icons/HeaderLogo.svg";
import Product from "./icons/Products.svg";
import Profile from "./icons/Profile.svg";
import { HeaderContainer, MenuComponent } from "./style";
import { formatString } from "utils/formatString";
import { useTheme } from "styled-components";

const Header = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [openInNewAccount, setOpenInNewAccount] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { logged, logout, user } = useAuth();
  const route = useRouter();
  const modalRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getOrders } = useOrders();
  const theme = useTheme();

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

  function getFirstTwoNames(fullName) {
    if (!fullName || typeof fullName !== "string") return "";

    const names = fullName.trim().split(/\s+/);
    return names.slice(0, 2).join(" ");
  }

  const handleLogoClick = () => {
    const coupon = searchParams.get("coupon");
    pathname === "/home"
      ? scrollToTop()
      : route.push(`/home${coupon ? `?coupon=${formatString(coupon)}` : ""}`);
  };

  return (
    <HeaderContainer>
      <div className="centerComponent">
        <span className="mainLogo" onClick={() => handleLogoClick()}>
          <HeaderLogo />
        </span>
        {!logged ? (
          <div className="loginContainer">
            <span
              className="loginButton getIn"
              onClick={() => handleOpenLogin(false)}
            >
              <Text
                align="start"
                fontName="SMALL_SEMI_BOLD"
                color={theme.text_02}
              >
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
              <Text
                color={theme.text_02}
                align="start"
                fontName="SMALL_SEMI_BOLD"
              >
                {user && getFirstTwoNames(user.name)}
              </Text>
            </span>
            {/* <Profile /> */}
          </div>
        )}
        {openMenu && (
          <MenuComponent ref={modalRef}>
            <span className="square" />
            <div
              className="menuOption"
              onClick={() => {
                getOrders(1, 6);
                setOpenMenu(false);
                route.push("/orders");
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
              className="menuOption"
              onClick={() => {
                setOpenMenu(false);
                route.push("/settings");
              }}
            >
              <span>
                <Gear />
              </span>
              <Text nowrap fontName="SMALL">
                Configurações
              </Text>
            </div>
            <div
              className="menuOption"
              onClick={() => {
                logout();
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
          openInNewAccount={openInNewAccount}
          setLoginModal={setLoginModal}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
