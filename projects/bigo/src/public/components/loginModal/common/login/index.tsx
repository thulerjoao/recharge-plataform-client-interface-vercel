import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "contexts/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginResponse } from "types/loginTypes";
import { apiUrl } from "utils/apiUrl";
import Email from "../../icons/Email.svg";
import Password from "../../icons/Password.svg";
import { LoginSteps } from "../../types/types";
import { loginSchema, LoginSchema } from "./schema";
import { ErrorMessage, LoginComponentContainer } from "./style";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  closeModal?: () => void;
}

const LoginComponent = ({ setStep, closeModal }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const { login } = useAuth();
  const rememberMe = watch("rememberMe");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    const body = {
      email: data.email,
      password: data.password,
    };
    await connectionAPIPost<LoginResponse>("/auth/login", body, apiUrl)
      .then(async (res) => {
        try {
          const response = await login(res, rememberMe);
          if (response) closeModal();
        } catch (error) {
          if (error instanceof Error) {
            setLoading(false);
            setErrorMessage("Erro ao realizar login");
          } else {
            setLoading(false);
            setErrorMessage("Usuário ou senha inválidos");
          }
        }
      })
      .catch((error) => {
        console.log("aqui01", error);
        const message: string = error && error.response.data.message[0];
        if (message.toLowerCase() === "email not verified") {
          sessionStorage.setItem("emailToConfirm", data.email);
          setStep("confirmCode");
        } else {
          setLoading(false);
          setErrorMessage("Usuário ou senha inválidos");
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    setErrorMessage("");
    if (errors.email) {
      setErrorMessage(errors.email.message);
      return;
    }
    if (errors.password) {
      setErrorMessage(errors.password.message);
      return;
    }
  }, [errors]);

  return (
    <LoginComponentContainer onSubmit={handleSubmit(onSubmit)}>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Entre para acessar sua conta
      </Text>
      <Input
        id="email"
        name="email"
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="E-mail"
        leftElement={<Email />}
        value={watch("email")}
        onChange={(e) => setValue("email", e.target.value)}
        onFocus={() => setErrorMessage("")}
      />
      <Input
        name="password"
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
        type="password"
        value={watch("password")}
        onChange={(e) => setValue("password", e.target.value)}
        onFocus={() => setErrorMessage("")}
      />
      <div className="keepConnected">
        <div
          className="check"
          onClick={() => setValue("rememberMe", !rememberMe)}
        >
          <span className="checkIcon">
            <span className={rememberMe && "fill"} />
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
        loading={loading}
      />
      <ErrorMessage>
        <Text
          align="center"
          margin="56px 0 0px 0"
          color={Theme.colors.pending}
          fontName="TINY"
        >
          {errorMessage}
        </Text>
      </ErrorMessage>
    </LoginComponentContainer>
  );
};

export default LoginComponent;
