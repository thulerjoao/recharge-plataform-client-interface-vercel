import { z } from "zod";

export const forgotPassSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

export type ForgotPassSchema = z.infer<typeof forgotPassSchema>;
