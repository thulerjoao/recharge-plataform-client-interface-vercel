import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import InputCode from "public/components/inputCode";
import React, { useEffect, useState } from "react";

import { LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";
import { apiUrl } from "utils/apiUrl";
import { LoginSteps } from "../../types/types";
import { ConfirmCodeContainer, ErrorMessage, SendCode } from "./style";

interface Props {
  askToRecover: boolean;
  timer: number;
  activateTimer: () => void;
  user: UserType;
  previousStep: "newAccount" | "newPassword" | null;
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  closeModal: () => void;
}

const ConfirmCode = ({
  askToRecover,
  timer,
  activateTimer,
  user,
  previousStep,
  setStep,
  closeModal,
}: Props) => {
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [code, setCode] = useState<number>(null);
  const [loading, setLoading] = useState<boolean>(false);

  interface VerifyCodeResponse {
    message: string;
    valid: boolean;
  }

  const handleSubmit = () => {
    if (previousStep === "newPassword") {
      const email = sessionStorage.getItem("emailToRecover");
      const data = {
        email,
        code: code.toString(),
      };

      connectionAPIPost<VerifyCodeResponse>("/auth/verify-code", data, apiUrl)
        .then((res) => {
          sessionStorage.setItem("code", data.code);
          sessionStorage.setItem("emailToRecover", data.email);
          setStep("newPassword");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message === "Reset code has expired") {
            setErrorMessage("Código expirado");
          } else if (error.response.data.message === "Invalid reset code") {
            setErrorMessage("Código inválido");
          } else {
            setErrorMessage("Erro ao confirmar código");
          }
        });
    }
    if (previousStep === "newAccount") {
      const email = sessionStorage.getItem("emailToConfirm");
      const data = {
        email,
        code: code.toString(),
      };
      console.log("data", data);
      connectionAPIPost<LoginResponse>("/auth/verify-email", data, apiUrl)
        .then((res) => {
          login(res, true);
          closeModal();
          alert("Conta criada com sucesso!");
        })
        .catch((err) => {
          setErrorMessage("Erro ao confirmar código");
        });
    }
  };

  const handleDisabled = () => {
    if (!code) return true;
    if (code.toString().length != 6) return true;
  };

  const handleSendCode = () => {
    if (askToRecover) {
      return;
    }

    const email =
      previousStep === "newPassword"
        ? sessionStorage.getItem("emailToRecover")
        : user.email;
    setLoading(true);
    connectionAPIPost(
      "/auth/forgot-password",
      {
        email,
      },
      apiUrl,
    )
      .then(() => {
        setLoading(false);
        activateTimer();
        alert("Um novo código foi enviado para seu e-mail");
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Não foi possível enviar um novo código");
      });
  };

  const formattedSeconds = String(timer).padStart(2, "0");

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
        sendCode={!askToRecover}
        onClick={() => !askToRecover && !loading && handleSendCode()}
      >
        <Text
          nowrap
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="SMALL"
        >
          Reenviar código
        </Text>
        {askToRecover && (
          <Text
            tag="h4"
            align="start"
            color={Theme.colors.mainHighlight}
            fontName="SMALL"
          >
            {timer > 1 && formattedSeconds}
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
