import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import React, { useState } from "react";

import { LoginParams, LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";
import { apiUrl } from "utils/apiUrl";
import { LoginSteps } from "../../types/types";
import { ConfirmCodeContainer, ErrorMessage } from "./style";
import { useAuth } from "context/auth";
import InputCode from "public/components/inputCode";

interface Props {
  user: UserType;
  previousStep: "newAccount" | "newPassword" | null;
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
}

const ConfirmCode = ({ user, previousStep, setStep }: Props) => {
  const emailToConfirm = sessionStorage.getItem("emailToConfirm");
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [code, setCode] = useState<number>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    // if (previousStep === "newAccount") {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      const data = {
        email: emailToConfirm ? emailToConfirm : user.email,
        code,
      };
      connectionAPIPost("/user/confirm-email", data, apiUrl)
        .then(async () => {
          const body: LoginParams = {
            email: user.email,
            password: user.password,
            rememberMe: true,
          };
          await connectionAPIPost<LoginResponse>(
            "/user/login",
            body,
            apiUrl,
          )
            .then(async (res) => {
              try {
                const rememberMe = true;
                const response = await login(res, rememberMe);
                // if (response) closeModal();
              } catch (error) {
                if (error instanceof Error) {
                  setErrorMessage(error.message);
                } else {
                  setLoading(false);
                  setErrorMessage("Usuário ou senha inválidos");
                }
              }
            })
            .catch((error) => {});
          setLoading(false);
          // closeModal();
        })
        .catch(() => {
          setErrorMessage("Código inválido");
          setLoading(false);
        });
    } else if (previousStep === "newPassword") {
      return;
    }
  };

  const handleDisabled = () => {
    if (!code) return true;
    if (code.toString().length != 6) return true;
  };

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
        title="Enviar"
        onClick={() => handleSubmit()}
        isNotSelected={handleDisabled()}
        disabled={handleDisabled()}
        loading={loading}
      />
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
