import connectRedis from "connect-redis";
import { SessionOptions } from "express-session";
import Redis from "ioredis";

const getRedisConfig = (redis : Redis,RedisStore : connectRedis.RedisStore) : SessionOptions =>  {
    return {
    name: "billtoken",
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 315360000000,
      httpOnly: false,
      secure: false,
    },
    saveUninitialized: false,
    secret: "keyboardcat",
    resave: false,}
  }

export default getRedisConfig;