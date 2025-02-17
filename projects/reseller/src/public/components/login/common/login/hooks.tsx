import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "context/auth";
import { UserType } from "types/globalTypes";
import { apiUrl } from "utils/apiUrl";

interface LoginProps {
  login: () => void;
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: UserType;
}

export const loginApi = async ({ email, password }: LoginProps) => {
  const body = {
    email,
    password,
  };

  const response = await connectionAPIPost<Response>(
    "/customer/login",
    body,
    apiUrl,
  ).then(() => {});

  console.log(response);
  return;
};
