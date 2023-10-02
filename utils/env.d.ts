declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_HOST: string;
    MONGO_DATABASE: string;
    MONGO_DOCUMENT: string;
  }
}
