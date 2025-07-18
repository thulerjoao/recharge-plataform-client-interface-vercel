import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import InputCode from "public/components/inputCode";
import React, { useEffect, useState } from "react";

import { LoginParams, LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";
import { apiUrl } from "utils/apiUrl";
import { LoginSteps } from "../../types/types";
import { ConfirmCodeContainer, ErrorMessage, SendCode } from "./style";

interface Props {
  user: UserType;
  previousStep: "newAccount" | "newPassword" | null;
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  closeModal: () => void;
}

const ConfirmCode = ({ user, previousStep, setStep, closeModal }: Props) => {
  const emailToConfirm = sessionStorage.getItem("emailToConfirm");
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [code, setCode] = useState<number>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);
  const [sendCode, setSendCode] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      email: emailToConfirm ? emailToConfirm : user.email,
      code: code.toString(),
    };
    connectionAPIPost("/user/confirm-email", data, apiUrl)
      .then(async () => {
        const body: LoginParams = {
          email: user.email,
          password: user.password,
          rememberMe: true,
        };
        await connectionAPIPost<LoginResponse>("/user/login", body, apiUrl)
          .then(async (res) => {
            try {
              const rememberMe = true;
              const response = await login(res, rememberMe);
              if (response) closeModal();
            } catch (error) {
              if (error instanceof Error) {
                setErrorMessage(error.message);
              } else {
                setLoading(false);
                setErrorMessage("Usuário ou senha inválidos");
              }
            }
          })
          .catch(() => {});
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        const message = error.response.data.message[0];
        if (message === "Code expired") {
          setErrorMessage("Código expirado");
        } else if (message === "Invalid code") {
          setErrorMessage("Código inválido");
        } else {
          setErrorMessage("Erro ao confirmar código");
        }
        setLoading(false);
      });
  };

  const handleDisabled = () => {
    if (!code) return true;
    if (code.toString().length != 6) return true;
  };

  const handleSendCode = () => {
    setLoading(true);
    connectionAPIPost(
      "/user/create-new-code-for-email-verification",
      {
        email: emailToConfirm,
      },
      apiUrl,
    )
      .then(() => {
        setSeconds(59);
        setSendCode(false);
        setLoading(false);
        alert("Um novo código foi enviado para seu e-mail");
      })
      .catch(() => {
        setSeconds(59);
        setSendCode(false);
        setLoading(false);
        setErrorMessage("Não foi possível enviar um novo código");
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    if (seconds <= 1) setSendCode(true);
    return () => clearInterval(intervalId);
  }, [seconds]);

  const formattedSeconds = String(seconds - 1).padStart(2, "0");

  useEffect(() => {
    if (errorMessage !== "") {
      const timeoutId = setTimeout(() => {
        setErrorMessage("");
      }, 8000);

      return () => clearTimeout(timeoutId);
    }
  }, [errorMessage]);

  return (
    <ConfirmCodeContainer>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Confirme o código que foi enviado para seu e-mail
      </Text>
      <InputCode code={code} setCode={setCode} />
      <Button
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Confirmar"
        onClick={() => handleSubmit()}
        isNotSelected={handleDisabled()}
        disabled={handleDisabled()}
        loading={loading}
      />
      <SendCode
        sendCode={sendCode}
        onClick={() => sendCode && !loading && handleSendCode()}
      >
        <Text
          nowrap
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="SMALL"
        >
          Reenviar código
        </Text>
        {!sendCode && (
          <Text
            tag="h4"
            align="start"
            color={Theme.colors.mainHighlight}
            fontName="SMALL"
          >
            {seconds > 1 && formattedSeconds}
          </Text>
        )}
      </SendCode>
      <ErrorMessage>
        <Text
          align="center"
          margin="14px 0 0px 0"
          color={Theme.colors.pending}
          fontName="TINY"
        >
          {errorMessage}
        </Text>
      </ErrorMessage>
    </ConfirmCodeContainer>
  );
};

export default ConfirmCode;
