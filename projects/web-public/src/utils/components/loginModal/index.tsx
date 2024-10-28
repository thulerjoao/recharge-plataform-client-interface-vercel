import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import React, { useState } from "react";
import Close from "./icons/Close.svg";

import TopLogo from "./icons/topLogo.svg";
import { LoginModalBackground, LoginModalContainer } from "./style";
import LoginComponent from "./components/login";

interface LoginModalProps {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModal }: LoginModalProps) => {
  const [check, setIsCheck] = useState<boolean>(true);
  const [newAccount, setNewAccount] = useState<boolean>(false);

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
          <div></div>
        )}
        <Button
          margin="24px 0 0 0"
          width={310}
          height={40}
          rounded
          title="Entrar"
        />
        <span style={{ cursor: "pointer" }} onClick={() => setNewAccount(true)}>
          <Text
            fontName="SMALL"
            margin="24px 0 48px 0"
            align="center"
            color={Theme.colors.mainHighlight}
          >
            Criar uma conta
          </Text>
        </span>
      </LoginModalContainer>
    </LoginModalBackground>
  );
};

export default LoginModal;
