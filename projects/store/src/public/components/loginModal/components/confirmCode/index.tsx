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

  // SSE watcher for email verification (only for new account confirmation)
  useEffect(() => {
    const email = user?.email || sessionStorage.getItem("emailToConfirm");

    if (previousStep !== "newAccount" || !email) {
      return;
    }

    const encodedEmail = encodeURIComponent(email);

    console.log("Connecting to SSE for email:", email); // Debug log

    // Create EventSource connection
    const eventSource = new EventSource(
      `${apiUrl}/sse/email-verified/${encodedEmail}`,
    );

    // Handle connection established
    eventSource.onopen = () => {
      console.log("SSE connection established for:", email);
    };

    // Handle incoming messages
    eventSource.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        // Handle connection confirmation
        if (data.type === "connected") {
          console.log("SSE connected:", data.message);
          return;
        }

        // Handle email verification
        if (data.type === "emailVerified" && data.success === true) {
          console.log("Email verified via SSE:", data.user); // Debug log
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

        // Handle errors
        if (data.type === "error") {
          console.error("SSE Error:", data.message);
        }
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    // Handle connection errors
    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    // Cleanup on unmount
    return () => {
      console.log("Closing SSE connection for:", email); // Debug log
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousStep, user?.email, apiUrl]);

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
