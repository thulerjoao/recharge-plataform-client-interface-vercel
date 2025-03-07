import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "contexts/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginParams, UserType } from "types/globalTypes";
import { apiUrl } from "utils/apiUrl";
import { LoginSteps } from "../../types/types";
import { codeSchema, CodeSchema } from "./schema";
import { ConfirmCodeContainer, ErrorMessage } from "./style";

interface Props {
  user: UserType;
  previousStep: "newAccount" | "newPassword" | null;
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  closeModal: () => void;
}

const ConfirmCode = ({ user, previousStep, setStep, closeModal }: Props) => {
  const { login } = useAuth();
  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CodeSchema>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (data: CodeSchema) => {
    const code = watch("code");
    if (previousStep === "newAccount") {
      const data = {
        email: user.email,
        code,
      };
      connectionAPIPost("/customer/confirm-email", data, apiUrl)
        .then(() => {
          const data: loginParams = {
            email: user.email,
            password: user.password,
            rememberMe: true,
          };
          login(data);
          closeModal();
        })
        .catch(() => {
          setError("code", { type: "manual", message: "Código inválido" });
        });
    } else if (previousStep === "newPassword") {
      return;
    }
  };

  useEffect(() => {
    setErrorMessage("");
    if (errors.code) {
      setErrorMessage(errors.code.message);
      return;
    }
  }, [errors]);

  return (
    <ConfirmCodeContainer onSubmit={handleSubmit(onSubmit)}>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Confirme o código que foi enviado para seu e-mail
      </Text>
      <Input
        type="number"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/[^0-9-]/g, "");
        }}
        style={{ textAlign: "center" }}
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        onChange={(e) => setValue("code", e.target.value)}
        onFocus={() => setErrorMessage("")}
      />
      <Button
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Enviar"
        type="submit"
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
