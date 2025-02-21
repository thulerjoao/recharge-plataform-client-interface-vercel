import { z } from "zod";

export const newPassSchema = z.object({
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .regex(
      /[^a-zA-Z0-9]/,
      "A senha deve conter ao menos um caractere especial",
    ),
  confirmPassword: z.string(),
});

export type NewPassSchema = z.infer<typeof newPassSchema>;
