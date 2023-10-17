declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_TOKEN: string;
    DISCORD_APP_ID: string;
    DISCORD_GUILD_ID: string;
    MONGO_HOST: string;
    MONGO_DATABASE: string;
    MONGO_DOCUMENT: string;
  }
}
