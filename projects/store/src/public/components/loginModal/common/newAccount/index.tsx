import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { UserType } from "types/userTypes";
import { apiUrl } from "utils/apiUrl";
import CPFicon from "../../icons/CPFicon.svg";
import Email from "../../icons/Email.svg";
import Name from "../../icons/Name.svg";
import Password from "../../icons/Password.svg";
import Phone from "../../icons/Phone.svg";
import { LoginSteps } from "../../types/types";
import { registerSchema, RegisterSchema } from "./schema";
import { ErrorMessage, NewAccountContainer } from "./style";

interface Props {
  setNewUser: React.Dispatch<React.SetStateAction<UserType>>;
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  setPreviousStep: React.Dispatch<
    React.SetStateAction<"newAccount" | "newPassword" | null>
  >;
}

const NewAccount = ({ setNewUser, setStep, setPreviousStep }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    const body: UserType = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      individualIdentification: {
        type: "CPF",
        value: data.cpf,
      },
    };
    await connectionAPIPost<null>("/customer", body, apiUrl)
      .then(() => {
        setNewUser(body);
        setPreviousStep("newAccount");
        setStep("confirmCode");
      })
      .catch((err) => {
        setErrorMessage("Erro ao cadastrar usuário");
      });
    setLoading(false);
  };

  useEffect(() => {
    setErrorMessage("");
    if (errors.name) {
      setErrorMessage(errors.name.message);
      return;
    }
    if (errors.email) {
      setErrorMessage(errors.email.message);
      return;
    }
    if (errors.phone) {
      setErrorMessage(errors.phone.message);
      return;
    }
    if (errors.cpf) {
      setErrorMessage(errors.cpf.message);
      return;
    }
    if (errors.password) {
      setErrorMessage(errors.password.message);
      return;
    }
  }, [errors]);

  return (
    <NewAccountContainer onSubmit={handleSubmit(onSubmit)}>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Cadastre-se para finalizar sua compra
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Nome"
        leftElement={<Name />}
        onFocus={() => setErrorMessage("")}
        onChange={(e) => setValue("name", e.target.value)}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="E-mail"
        leftElement={<Email />}
        onFocus={() => setErrorMessage("")}
        onChange={(e) => setValue("email", e.target.value)}
      />
      <InputMask
        mask="(99) 99999-9999"
        maskChar=""
        onFocus={() => setErrorMessage("")}
        onChange={(e) => setValue("phone", e.target.value)}
      >
        {(inputProps: React.ComponentPropsWithoutRef<"input">) => (
          <Input
            {...inputProps}
            margin="24px 0 0 0"
            padding="0 8px 0px 40px"
            height={40}
            placeholder="Telefone"
            leftElement={<Phone />}
          />
        )}
      </InputMask>
      <InputMask
        mask="999.999.999-99"
        maskChar=""
        onFocus={() => setErrorMessage("")}
        onChange={(e) => setValue("cpf", e.target.value)}
      >
        {(inputProps: React.ComponentPropsWithoutRef<"input">) => (
          <Input
            {...inputProps}
            margin="24px 0 0 0"
            padding="0 8px 0px 40px"
            height={40}
            placeholder="CPF"
            leftElement={<CPFicon />}
          />
        )}
      </InputMask>
      <Input
        type="password"
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
        onFocus={() => setErrorMessage("")}
        onChange={(e) => setValue("password", e.target.value)}
      />
      <span style={{ cursor: "pointer" }}>
        <Text
          margin="4px 0 0 0"
          align="center"
          color={Theme.colors.secondaryText}
          fontName="TINY"
        >
          Termos de uso e Políticas de Privacidade
        </Text>
      </span>
      <Button
        type="submit"
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Cadastre-se"
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
    </NewAccountContainer>
  );
};

export default NewAccount;
