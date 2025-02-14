import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import React, { useState } from "react";
import Email from "../../icons/Email.svg";
import Password from "../../icons/Password.svg";
import { LoginSteps } from "../../types/types";
import { LoginComponentContainer } from "./style";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  closeModal?: () => void;
}

const LoginComponent = ({ setStep, closeModal }: Props) => {
  const [check, setIsCheck] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    const body = {
      email,
      password,
    };
    // cat /etc/resolv.conf | grep nameserver | awk '{print $2}' PROMPT TO FIND NON WSL2 IP
    const response = connectionAPIPost("/auth", body, "http://127.0.0.11:3333");
    console.log(response);
  };

  return (
    <LoginComponentContainer>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Entre para acessar sua conta
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="E-mail"
        leftElement={<Email />}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="keepConnected">
        <div className="check" onClick={() => setIsCheck(!check)}>
          <span className="checkIcon">
            <span className={check && "fill"} />
          </span>
          <Text margin="0 0 0 4px" nowrap fontName="TINY">
            Continuar conectado
          </Text>
        </div>
        <span
          className="forgotPassword"
          onClick={() => setStep("forgotPassword")}
        >
          <Text
            nowrap
            align="end"
            color={Theme.colors.mainHighlight}
            fontName="TINY"
          >
            Esqueceu sua senha?
          </Text>
        </span>
      </div>
      <Button
        onClick={() => {
          handleLogin();
          // closeModal();
        }}
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Entrar"
      />
    </LoginComponentContainer>
  );
};

export default LoginComponent;
