import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import InputCode from "public/components/inputCode";
import React, { useEffect, useState } from "react";
import { LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";
import { apiUrl, storeId } from "utils/apiUrl";
import { LoginSteps } from "../../types/types";
import { ConfirmCodeContainer, ErrorMessage, SendCode } from "./style";
import { io } from "socket.io-client";

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
    setLoading(true);
    if (previousStep === "newPassword") {
      const email = sessionStorage.getItem("emailToRecover");
      const data = {
        email,
        code: code.toString(),
        storeId,
      };

      connectionAPIPost<VerifyCodeResponse>("/auth/verify-code", data, apiUrl)
        .then(() => {
          sessionStorage.setItem("code", data.code);
          sessionStorage.setItem("emailToRecover", data.email);
          setStep("newPassword");
        })
        .catch((error) => {
          const message: string = error.response.data.message;
          if (message === "Reset code has expired") {
            setErrorMessage("Código expirado");
          } else if (message === "Invalid reset code") {
            setErrorMessage("Código inválido");
          } else {
            setErrorMessage("Erro ao confirmar código");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (previousStep === "newAccount") {
      const email = sessionStorage.getItem("emailToConfirm");
      const data = {
        email,
        code: code.toString(),
        storeId,
      };
      connectionAPIPost<LoginResponse>("/auth/verify-email", data, apiUrl)
        .then((res) => {
          login(res, true);
          sessionStorage.removeItem("emailToConfirm");
          closeModal();
          alert("Conta criada com sucesso!");
        })
        .catch((error) => {
          const message: string = error.response.data.message;
          if (message === "Confirmation code has expired") {
            setErrorMessage("Código expirado");
          } else if (message === "Invalid confirmation code") {
            setErrorMessage("Código inválido");
          } else if (message === "Email is already verified") {
            setErrorMessage("Conta já verificada");
          } else {
            setErrorMessage("Erro ao confirmar código");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // WebSocket watcher for email verification (only for new account confirmation)
  useEffect(() => {
    if (previousStep !== "newAccount") {
      return;
    }

    const socket = io(apiUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      if (user?.id) {
        socket.emit("joinUserRoom", { userId: user.id });
      }
    });

    socket.on("emailVerified", async (data: any) => {
      if (!data) return;
      if (data.success === true) {
        try {
          if (user?.email && user?.password) {
            const body = {
              email: user.email,
              password: user.password,
              storeId,
            };
            const res = await connectionAPIPost<LoginResponse>(
              "/auth/login",
              body,
              apiUrl,
            );
            await login(res, true);
            sessionStorage.removeItem("emailToConfirm");
            closeModal();
            return;
          }

          if (data.access && data.user) {
            await login(data as LoginResponse, true);
            sessionStorage.removeItem("emailToConfirm");
            closeModal();
            return;
          }

          setErrorMessage("");
          setStep("login");
          alert("Email verificado! Faça login para continuar.");
        } catch {
          setStep("login");
        }
      }
    });

    return () => {
      socket.off("emailVerified");
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousStep, user?.id, apiUrl]);

  const handleDisabled = () => {
    if (!code) return true;
    if (code.toString().length != 6) return true;
  };

  const handleSendCode = () => {
    if (timer > 1) {
      return;
    }
    setLoading(true);
    if (previousStep === "newAccount") {
      const email = sessionStorage.getItem("emailToConfirm");
      const data = {
        email,
        storeId,
      };
      connectionAPIPost<null>("/auth/resend-email-confirmation", data, apiUrl)
        .then(() => {
          activateTimer();
          alert("Um novo código foi enviado para seu e-mail");
        })
        .catch((error) => {
          const message = error.response.data.message;
          if (message === "Email is already verified") {
            setErrorMessage("Conta já verificada");
          }
          setErrorMessage("Falha ao enviar novo código");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (previousStep === "newPassword") {
      const email = sessionStorage.getItem("emailToRecover");
      const data = {
        email,
        storeId,
      };
      connectionAPIPost<null>("/auth/forgot-password", data, apiUrl)
        .then(() => {
          activateTimer();
          alert("Um novo código foi enviado para seu e-mail");
        })
        .catch(() => {
          setErrorMessage("Falha ao enviar novo código");
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
      <Text margin="24px 0 4px 0" align="center" fontName="REGULAR_MEDIUM">
        {previousStep === "newAccount"
          ? "Confirmação de conta"
          : "Recuperação de senha"}
      </Text>
      <Text align="center" fontName="REGULAR">
        Informe o código enviado para seu e-mail
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
