import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "context/auth";
import React from "react";
import { useForm } from "react-hook-form";
import Email from "../../icons/Email.svg";
import Password from "../../icons/Password.svg";
import { LoginSteps } from "../../types/types";
import { LoginComponentContainer } from "./style";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
}

interface LoginProps {
  email: string;
  password: string;
  isChecked: boolean;
}

const LoginComponent = ({ setStep }: Props) => {
  const { login } = useAuth();
  const { handleSubmit, watch, setValue } = useForm<LoginProps>({
    defaultValues: {
      email: "",
      password: "",
      isChecked: true,
    },
  });

  const isChecked = watch("isChecked");

  const onSubmit = (data: LoginProps) => {
    console.log("Dados do formulário:", data);
    login(data);
  };

  return (
    <LoginComponentContainer onSubmit={handleSubmit(onSubmit)}>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Entre para acessar sua conta
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="E-mail"
        leftElement={<Email />}
        value={watch("email")}
        onChange={(e) => setValue("email", e.target.value)}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
        type="password"
        value={watch("password")}
        onChange={(e) => setValue("password", e.target.value)}
      />
      <div className="keepConnected">
        <div
          className="check"
          onClick={() => setValue("isChecked", !isChecked)}
        >
          <span className="checkIcon">
            <span className={isChecked && "fill"} />
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
        type="submit"
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
