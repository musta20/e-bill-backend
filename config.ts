import dotenv from "dotenv";

dotenv.config();

interface ENV {
  DB_TYPE: "postgres";
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
  DB_SYN: boolean | undefined;
  DB_LOGGING: boolean | undefined;
  SERVER_PORT: number | undefined;
  BACK_END_URL: string | undefined;
  APOLLO_URL: string | undefined;
  REDIS_PORT: number | undefined;

}

interface Config {
  DB_TYPE: "postgres";
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
  DB_SYN: boolean | undefined;
  DB_LOGGING: boolean | undefined;
  BACK_END_URL: string | undefined;
  SERVER_PORT: number | undefined;

  APOLLO_URL: string | undefined;
  REDIS_PORT: number | undefined;

}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    DB_HOST: process.env.DB_HOST,
    DB_TYPE: "postgres",

    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    SERVER_PORT: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : undefined,

    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_SYN: process.env.DB_SYN ? Boolean(process.env.DB_SYN) : undefined,
    DB_LOGGING: process.env.DB_LOGGING
      ? Boolean(process.env.DB_LOGGING)
      : undefined,
    BACK_END_URL: process.env.BACK_END_URL,
    APOLLO_URL: process.env.APOLLO_URL,
    REDIS_PORT:process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
