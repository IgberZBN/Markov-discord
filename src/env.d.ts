declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_TOKEN: string;
    MONGO_HOST: string;
    MONGO_DATABASE: string;
    MONGO_DOCUMENT: string;
  }
}
