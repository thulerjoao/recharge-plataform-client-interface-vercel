import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import React, { useEffect, useState } from "react";
import Close from "./icons/Close.svg";

import LoginComponent from "./components/login";
import NewAccount from "./components/newAccount";
import TopLogo from "./icons/topLogo.svg";
import { LoginModalBackground, LoginModalContainer } from "./style";

interface LoginModalProps {
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ loginModal, setLoginModal }: LoginModalProps) => {
  const [check, setIsCheck] = useState<boolean>(true);
  const [newAccount, setNewAccount] = useState<boolean>(false);

  useEffect(() => {
    if (loginModal) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "scroll";
    } else {
      document.documentElement.style.overflowY = "scroll";
    }

    return () => {
      document.documentElement.style.overflowY = "scroll";
      document.body.style.overflowY = "hidden";
    };
  }, [loginModal]);

  return (
    <LoginModalBackground onClick={() => setLoginModal(false)}>
      <LoginModalContainer onClick={(e) => e.stopPropagation()}>
        <div className="close">
          <span onClick={() => setLoginModal(false)}>
            <Close />
          </span>
        </div>
        <TopLogo />
        {!newAccount ? (
          <LoginComponent check={check} setIsCheck={setIsCheck} />
        ) : (
          <NewAccount />
        )}
        <span
          className="newAccountButton"
          onClick={() => setNewAccount(!newAccount)}
        >
          <Text
            fontName="SMALL"
            align="center"
            color={Theme.colors.mainHighlight}
          >
            {!newAccount ? "Criar uma conta" : "Já possui uma conta?"}
          </Text>
        </span>
      </LoginModalContainer>
    </LoginModalBackground>
  );
};

export default LoginModal;
