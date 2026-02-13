import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "contexts/auth";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useForm } from "react-hook-form";
import { LoginResponse } from "types/loginTypes";
import { storeId } from "utils/apiUrl";
import Password from "../../icons/Password.svg";
import { newPassSchema, NewPassSchema } from "./schema";
import { ErrorMessage, NewPasswordContainer } from "./style";
import toast from "react-hot-toast";

interface Props {
  closeModal: () => void;
}

const NewPassword = ({ closeModal }: Props) => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewPassSchema>({
    resolver: zodResolver(newPassSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login } = useAuth();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async () => {
    setLoading(true);
    const email = sessionStorage.getItem("emailToRecover");
    const code = sessionStorage.getItem("code");
    const dataToSend = {
      email,
      code,
      password,
      confirmPassword,
      storeId,
    };

    await connectionAPIPost<LoginResponse>(
      "/auth/reset-password",
      dataToSend,
      apiUrl,
    )
      .then((res) => {
        sessionStorage.clear();
        login(res, true);
        closeModal();
        toast.success("Senha atualizada com sucesso!");
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message === "Passwords do not match") {
          setErrorMessage("As senhas não coincidem");
        } else if (message === "Reset code has expired") {
          setErrorMessage("Código expirado, tente novamente");
        } else if (message === "Invalid reset code") {
          setErrorMessage("Código inválido, tente novamente");
        } else {
          setErrorMessage("Erro ao atualizar senha");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setErrorMessage("");
    if (errors.password) {
      setErrorMessage(errors.password.message);
      return;
    }
    if (errors.confirmPassword) {
      setErrorMessage(errors.confirmPassword.message);
      return;
    }
  }, [errors]);
  return (
    <NewPasswordContainer onSubmit={handleSubmit(onSubmit)}>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Crie uma nova senha
      </Text>
      <Text
        margin="2px 0 0 0"
        align="center"
        fontName="TINY"
        color={theme.text_04}
      >
        Mínimo 6 caracteres
      </Text>
      <Input
        type="password"
        margin="20px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
        value={watch("password")}
        onChange={(e) => setValue("password", e.target.value)}
        onFocus={() => setErrorMessage("")}
      />
      <Input
        type="password"
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Confirmar senha"
        leftElement={<Password />}
        value={watch("confirmPassword")}
        onChange={(e) => setValue("confirmPassword", e.target.value)}
        onFocus={() => setErrorMessage("")}
      />
      <Button
        type="submit"
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Confirmar"
        loading={loading}
      />
      <ErrorMessage>
        <Text
          align="center"
          margin="14px 0 0px 0"
          color={theme.pending}
          fontName="TINY"
        >
          {errorMessage}
        </Text>
      </ErrorMessage>
    </NewPasswordContainer>
  );
};

export default NewPassword;
