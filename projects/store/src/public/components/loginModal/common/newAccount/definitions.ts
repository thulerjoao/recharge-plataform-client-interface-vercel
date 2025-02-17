import { z } from "zod";

export const LoginFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve conter pelo menos 2 letras" })
    .trim(),
  email: z.string().email({ message: "E-mail inválido" }).trim(),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "A senha deve conter ao menos 1 letra" })
    .regex(/[0-9]/, { message: "A senha deve conter ao menos 1 número" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "A senha deve conter ao menos 1 caracter especial",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
