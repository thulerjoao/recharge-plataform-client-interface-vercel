import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "utils/apiUrl";
import Email from "../../icons/Email.svg";
import { LoginSteps } from "../../types/types";
import { forgotPassSchema, ForgotPassSchema } from "./schema";
import { ErrorMessage, ForgotPasswordContainer } from "./style";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
}

const ForgotPassword = ({ setStep }: Props) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ForgotPassSchema>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const saveStorageEmail = (email: string) => {
    sessionStorage.setItem("emailToRecover", email);
    setTimeout(() => {
      sessionStorage.removeItem("emailToRecover");
    }, 600000);
  };

  const onSubmit = async (data: ForgotPassSchema) => {
    setLoading(true);
    const IsAnEmail = sessionStorage.getItem("emailToRecover");
    if (IsAnEmail === email) {
      return setStep("confirmCodePass");
    } else {
      sessionStorage.removeItem("emailToRecover");
    }
    connectionAPIPost<null>(
      "/user/send-code-to-recover-password",
      data,
      apiUrl,
    )
      .then((res) => {
        saveStorageEmail(email);
        setStep("confirmCodePass");
        return;
      })
      .catch((error) => {
        const message = error.response.data.message[0];
        if (
          message.toLowerCase() ===
          `email: '${email.toLowerCase()}' not verified`
        ) {
          sessionStorage.setItem("emailToConfirm", email);
          setStep("confirmCodePass");
        }
        setErrorMessage("Erro ao realizar o pedido");
      });
    setLoading(false);
  };

  useEffect(() => {
    setErrorMessage("");
    if (errors.email) {
      setErrorMessage(errors.email.message);
      return;
    }
  }, [errors]);

  const handleDisabled = () => {
    if (!email) return true;
  };

  return (
    <ForgotPasswordContainer onSubmit={handleSubmit(onSubmit)}>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Digite seu e-mail para recuperar sua senha
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="E-mail"
        leftElement={<Email />}
        onChange={(e) => setValue("email", e.target.value)}
        onFocus={() => setErrorMessage("")}
      />
      <Button
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Continuar"
        type="submit"
        loading={loading}
        isNotSelected={handleDisabled()}
        disabled={handleDisabled()}
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
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
