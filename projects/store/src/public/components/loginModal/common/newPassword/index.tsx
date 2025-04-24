import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "contexts/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "utils/apiUrl";
import Password from "../../icons/Password.svg";
import { newPassSchema, NewPassSchema } from "./schema";
import { ErrorMessage, NewPasswordContainer } from "./style";
import { Theme } from "@4miga/design-system/theme/theme";

interface Props {
  closeModal: () => void;
}

const NewPassword = ({ closeModal }: Props) => {
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

  const onSubmit = async (data: NewPassSchema) => {
    setLoading(true);
    await connectionAPIPost<any>(
      "/user/update-by-code",
      {
        // email: newPassRes.email,
        // code: newPassRes.code,
        password,
        confirmPassword,
      },
      apiUrl,
    )
      .then(() => {
        // login({
        //   // email: newPassRes.email,
        //   password,
        //   rememberMe: true,
        // });
        closeModal();
      })
      .catch((err) => {
        setErrorMessage("Erro ao atualizar senha");
      });
    setLoading(false);
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
      <Input
        type="password"
        margin="24px 0 0 0"
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
          color={Theme.colors.pending}
          fontName="TINY"
        >
          {errorMessage}
        </Text>
      </ErrorMessage>
    </NewPasswordContainer>
  );
};

export default NewPassword;
