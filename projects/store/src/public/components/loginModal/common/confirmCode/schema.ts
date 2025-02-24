import { z } from "zod";

export const codeSchema = z.object({
  code: z
    .string()
    .min(5, "O código deve ter 5 caracteres")
    .max(5, "O código deve ter 5 caracteres"),
});

export type CodeSchema = z.infer<typeof codeSchema>;
