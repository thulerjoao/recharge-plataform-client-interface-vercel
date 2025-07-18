import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";

interface loginProps {
  email: string;
  password: string;
  baseUrl: string;
}

export const loginApi = async ({ email, password, baseUrl }: loginProps) => {
  const body = {
    email,
    password,
  };

  const response = await connectionAPIPost<any>(
    "/user/login",
    body,
    baseUrl,
  );
};
