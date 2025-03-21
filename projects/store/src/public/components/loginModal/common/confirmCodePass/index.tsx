import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "contexts/auth";
import InputCode from "public/components/inputCode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "utils/apiUrl";
import EyeOff from "../../icons/EyeOff.svg";
import EyeOn from "../../icons/EyeOn.svg";
import Password from "../../icons/Password.svg";
import { newPassSchema, NewPassSchema } from "./schema";
import { ConfirmCodePassContainer, ErrorMessage } from "./style";
import { LoginResponse } from "types/loginTypes";

interface Props {
  closeModal: () => void;
}

const ConfirmCodePass = ({ closeModal }: Props) => {
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
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login } = useAuth();
  const [code, setCode] = useState<number>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const password = watch("password");

  const onSubmit = async (data: NewPassSchema) => {
    setLoading(true);
    const email = sessionStorage.getItem("emailToRecover");
    const body = {
      email,
      code: code.toString(),
      newPassword: password,
    };
    console.log(body);
    await connectionAPIPost<any>("/customer/recover-password", body, apiUrl)
      .then(async () => {
        sessionStorage.removeItem("emailToRecover");
        await connectionAPIPost<LoginResponse>("/customer/login", body, apiUrl)
          .then(async (res) => {
            try {
              const rememberMe = true;
              const response = await login(res, rememberMe);
              if (response) closeModal();
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
        closeModal();
      })
      .catch((err) => {
        handleErrorResponse(err.response.data.message[0]);
      });
    setLoading(false);
  };

  useEffect(() => {
    setErrorMessage("");
    if (errors.password) {
      setErrorMessage(errors.password.message);
      return;
    }
  }, [errors]);

  const handleDisabled = () => {
    if (!code || !password) return true;
    if (code.toString().length != 6) return true;
  };

  const ChangeVisibilaty = () => {
    setVisible(!visible);
  };

  const handleErrorResponse = (res: string) => {
    if (res.toLocaleLowerCase() === "invalid code") {
      setErrorMessage("Código inválido");
    } else if (res.toLocaleLowerCase() === "code expired") {
      setErrorMessage("Código expirado");
    } else {
      setErrorMessage("Erro ao atualizar senha");
    }
  };

  return (
    <ConfirmCodePassContainer onSubmit={handleSubmit(onSubmit)}>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Digite sua nova senha
      </Text>
      <Input
        type={!visible && "password"}
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
        value={watch("password")}
        onChange={(e) => setValue("password", e.target.value)}
        onFocus={() => setErrorMessage("")}
      />
      <Text margin="32px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Insira o código que foi enviado para seu e-mail
      </Text>
      <InputCode code={code} setCode={setCode} />
      <Button
        type="submit"
        margin="32px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Confirmar"
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
    </ConfirmCodePassContainer>
  );
};

export default ConfirmCodePass;
