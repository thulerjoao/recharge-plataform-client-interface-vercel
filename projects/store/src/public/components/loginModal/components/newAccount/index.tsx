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
import { apiUrl } from "@4miga/services/connectionAPI/url";
import CPFicon from "../../icons/CPFicon.svg";
import Email from "../../icons/Email.svg";
import EyeOff from "../../icons/EyeOff.svg";
import EyeOn from "../../icons/EyeOn.svg";
import Name from "../../icons/Name.svg";
import Password from "../../icons/Password.svg";
import Phone from "../../icons/Phone.svg";
import { LoginSteps } from "../../types/types";
import { registerSchema, RegisterSchema } from "./schema";
import { ErrorMessage, NewAccountContainer } from "./style";
import { storeId } from "utils/apiUrl";

interface Props {
  setNewUser: React.Dispatch<React.SetStateAction<UserType>>;
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  setPreviousStep: React.Dispatch<
    React.SetStateAction<"newAccount" | "newPassword" | null>
  >;
}

const NewAccount = ({ setNewUser, setStep, setPreviousStep }: Props) => {
  const emailToConfirm = sessionStorage.getItem("emailToConfirm");
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
  const [visible, setVisible] = useState<boolean>(false);

  const ChangeVisibilaty = () => {
    setVisible(!visible);
  };

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    if (emailToConfirm === data.email) setStep("confirmCode");
    const body: UserType = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      documentType: "cpf",
      documentValue: data.cpf,
      storeId,
    };
    await connectionAPIPost<UserType>("/user", body, apiUrl)
      .then((res) => {
        setNewUser({ id: res.id, ...body });
        sessionStorage.setItem("emailToConfirm", body.email);
        setPreviousStep("newAccount");
        setStep("confirmCode");
      })
      .catch((err) => {
        handleErrorResponse(err.response.data.message);
        sessionStorage.removeItem("emailToConfirm");
      });
    setLoading(false);
  };

  useEffect(() => {
    const emailToConfirm = sessionStorage.getItem("emailToConfirm");
    if (emailToConfirm) {
      sessionStorage.removeItem("emailToConfirm");
    }
  }, []);

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

  const handleErrorResponse = (res: string) => {
    if (res === "User with this email already exists") {
      setErrorMessage("Email já cadastrado");
      setLoading(false);
    } else if (res === "User with this document already exists") {
      setErrorMessage("CPF já cadastrado");
      setLoading(false);
    } else if (res.toLocaleLowerCase() === "Name is required") {
      setErrorMessage("Nome inválido");
      setLoading(false);
    } else {
      setErrorMessage("Erro ao criar conta");
      setLoading(false);
    }
  };

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
        name="password"
        type={!visible ? "password" : "text"}
        margin="24px 0 0 0"
        padding="0 30px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
        rightElement={
          visible ? (
            <EyeOn
              style={{ cursor: "pointer" }}
              onClick={() => ChangeVisibilaty()}
            />
          ) : (
            <EyeOff
              style={{ cursor: "pointer" }}
              onClick={() => ChangeVisibilaty()}
            />
          )
        }
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
