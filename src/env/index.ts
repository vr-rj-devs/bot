import z from "zod";

const envSchema = z.object({
  TOKEN: z.string(),
  CLIENT_ID: z.string(),
  GUILD_ID: z.string()
});

export const ENV = envSchema.safeParse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) return result.error.issues;
};