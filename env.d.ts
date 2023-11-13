declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      TOKEN: string | undefined;
      CLIENT_ID: string | undefined;
      GUILD_ID: string | undefined;
    }
  }
}

export { }