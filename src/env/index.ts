import z from "zod";
import { generateErrorMessage } from "zod-error";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  TOKEN: z.string(),
  CLIENT_ID: z.string(),
  GUILD_ID: z.string(),
});
const safeParseResult = envSchema.safeParse(process.env);

export const ENV = new Proxy(process.env as typeof envSchema._type, {
  get: (target, name) => {
    if (!safeParseResult.success) {
      console.error("❌ Invalid environment variables, check the errors below!");
      console.error(generateErrorMessage(safeParseResult.error.issues, { delimiter: { error: "\\n" } }));
      process.exit(-1);
    }

    return target[name as keyof typeof target];
  },
});
