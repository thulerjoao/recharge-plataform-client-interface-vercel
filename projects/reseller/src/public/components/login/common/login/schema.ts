import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .regex(
      /[^a-zA-Z0-9]/,
      "A senha deve conter ao menos um caractere especial",
    ),
  rememberMe: z.boolean().default(true),
});

export type LoginSchema = z.infer<typeof loginSchema>;
