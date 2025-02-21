import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSteps } from "../../types/types";
import { codeSchema, CodeSchema } from "./schema";
import { ConfirmCodeContainer, ErrorMessage } from "./style";
import { Theme } from "@4miga/design-system/theme/theme";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  newPassRes: { email: string; code: number };
}

const ConfirmCode = ({ setStep, newPassRes }: Props) => {
  const {
    handleSubmit,
    watch,
    setValue,
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
    if (+code === newPassRes.code) {
      setStep("newPassword");
    } else {
      setErrorMessage("Código inválido");
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
