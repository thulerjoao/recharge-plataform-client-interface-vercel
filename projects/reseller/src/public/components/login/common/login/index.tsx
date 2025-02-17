import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "context/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Email from "../../icons/Email.svg";
import Password from "../../icons/Password.svg";
import { LoginSteps } from "../../types/types";
import { LoginComponentContainer } from "./style";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
}

const LoginComponent = ({ setStep }: Props) => {
  const [email, setEmail] = useState<string>("email@email.com");
  const [password, setPassword] = useState<string>("Abcd@1234");
  const [check, setIsCheck] = useState<boolean>(true);
  const route = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    const data = {
      email,
      password,
      isChecked: check,
    };
    login(data);
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
        onClick={() => handleLogin()}
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
