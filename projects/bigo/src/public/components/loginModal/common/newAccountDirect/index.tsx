import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "contexts/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { LoginResponse } from "types/loginTypes";
import { UserType } from "types/userTypes";
import { storeId } from "utils/apiUrl";
import CPFicon from "../../icons/CPFicon.svg";
import Email from "../../icons/Email.svg";
import EyeOff from "../../icons/EyeOff.svg";
import EyeOn from "../../icons/EyeOn.svg";
import Name from "../../icons/Name.svg";
import Password from "../../icons/Password.svg";
import Phone from "../../icons/Phone.svg";
import { registerSchema, RegisterSchema } from "./schema";
import { ErrorMessage, NewAccountDirectContainer } from "./style";

interface Props {
  closeModal: () => void;
}

const NewAccountDirect = ({ closeModal }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      password: "",
      termsAccepted: false,
    },
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const termsAccepted = watch("termsAccepted");

  const ChangeVisibilaty = () => {
    setVisible(!visible);
  };

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    const body: UserType = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      documentType: "cpf",
      documentValue: data.cpf,
      storeId,
    };

    await connectionAPIPost<LoginResponse>("/user/create-direct", body)
      .then(async (res) => {
        await login(res, true);
        closeModal();
        alert("Conta criada com sucesso!");
      })
      .catch((err) => {
        handleErrorResponse(
          err.response?.data?.message || "Erro ao criar conta",
        );
      })
      .finally(() => {
        setLoading(false);
      });
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
    if (errors.termsAccepted) {
      setErrorMessage(errors.termsAccepted.message);
      return;
    }
  }, [errors]);

  const handleErrorResponse = (res: string) => {
    if (res === "User with this email already exists") {
      setErrorMessage("Email já cadastrado");
    } else if (res === "User with this document already exists") {
      setErrorMessage("CPF já cadastrado");
    } else if (
      res.toLocaleLowerCase() === "Name is required" ||
      res.includes("Name must contain at least two words")
    ) {
      setErrorMessage("Nome completo obrigatório");
    } else {
      setErrorMessage("Erro ao criar conta");
    }
  };

  return (
    <NewAccountDirectContainer onSubmit={handleSubmit(onSubmit)}>
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
      <Text
        margin="2px 0 0 0"
        align="center"
        fontName="TINY"
        color={Theme.colors.secondaryTextAction}
      >
        Mínimo 6 caracteres, 1 maiúscula e 1 caractere especial
      </Text>
      <span className="termsAndConditions" style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => {
            setValue("termsAccepted", e.target.checked);
            setErrorMessage("");
          }}
        ></input>
        <Text color={Theme.colors.secondaryText} fontName="TINY">
          Concordo com os
        </Text>
        <Text
          underline
          pointer
          align="center"
          color={Theme.colors.secondaryText}
          fontName="TINY"
          onClick={() => window.open("/terms", "_blank")}
        >
          termos e condições
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
    </NewAccountDirectContainer>
  );
};

export default NewAccountDirect;
