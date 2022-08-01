import "reflect-metadata";

import databaseConfig from "./src/dataBase/pgConfig";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BillResolver } from "./src/Resolvers/BillResolver";
import { UserResolver } from "./src/Resolvers/UserResolver";
import cors from "cors";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { DataSource } from "typeorm";
import path from "path";
import config from "./config";
import getRedisConfig from "./src/dataBase/RedisConfig";

const main = async () => {

  const PORT = config.SERVER_PORT;
  const typeOrmConnection = await new DataSource(databaseConfig);


////////// data base ///////////

  typeOrmConnection
    .initialize()
    .then(() => {
      console.log("\x1b[32m%s\x1b[0m", `Data Source has been initialized!`);
    })
    .catch((err) => {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Error during Data Source initialization",
        err
      );
    });
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));




   ///////  redis store ///////////
  const RedisStore = connectRedis(session);
  const redis = new Redis(config.REDIS_PORT as number,config.DB_HOST as string);

  app.use(
    cors({
      credentials: true,
      origin: config.BACK_END_URL,
    })
  );

  app.use(
    session(getRedisConfig(redis,RedisStore))
  );


  ///////////   apolloServer   //////////////


  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BillResolver, UserResolver],
    }),
    context: ({ req, res }) => ({ req, res, typeOrmConnection }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });



///////////express Middleware //////////////
  app.get("/", (_req, res) => {
    res.send("BACK END URL IS http://localhost:3000");
  });

  app.get("/PDF/:name", (_req, res) => {
    res.sendFile(
      path.join(path.resolve(__dirname, ".."), "src/public/" + _req.params.name)
    );
  });

  app.listen(PORT, () => {
    console.log("\x1b[33m%s\x1b[0m", `NODEJS SERVER RUNNING ON PORT:${PORT}`);
  });
};



main().catch((err) => console.log(err));
