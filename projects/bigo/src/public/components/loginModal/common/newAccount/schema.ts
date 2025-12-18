import { cpf } from "cpf-cnpj-validator";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(15, "Número de telefone inválido")
    .max(15, "Número de telefone inválido"),
  cpf: z.string().refine((value) => cpf.isValid(value.replace(/\D/g, "")), {
    message: "CPF inválido",
  }),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .regex(
      /[^a-zA-Z0-9]/,
      "A senha deve conter ao menos um caractere especial",
    ),
  termsAccepted: z.boolean().refine((value) => value === true, {
    message: "Concorde com os termos e condições",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
