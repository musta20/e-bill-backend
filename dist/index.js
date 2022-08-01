"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const pgConfig_1 = __importDefault(require("./src/dataBase/pgConfig"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const BillResolver_1 = require("./src/Resolvers/BillResolver");
const UserResolver_1 = require("./src/Resolvers/UserResolver");
const cors_1 = __importDefault(require("cors"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const RedisConfig_1 = __importDefault(require("./src/dataBase/RedisConfig"));
const main = async () => {
    const PORT = config_1.default.SERVER_PORT;
    const typeOrmConnection = await new typeorm_1.DataSource(pgConfig_1.default);
    typeOrmConnection
        .initialize()
        .then(() => {
        console.log("\x1b[32m%s\x1b[0m", `Data Source has been initialized!`);
    })
        .catch((err) => {
        console.log("\x1b[31m%s\x1b[0m", "Error during Data Source initialization", err);
    });
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default(config_1.default.REDIS_PORT, config_1.default.DB_HOST);
    app.use((0, cors_1.default)({
        credentials: true,
        origin: config_1.default.BACK_END_URL,
    }));
    app.use((0, express_session_1.default)((0, RedisConfig_1.default)(redis, RedisStore)));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [BillResolver_1.BillResolver, UserResolver_1.UserResolver],
        }),
        context: ({ req, res }) => ({ req, res, typeOrmConnection }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.get("/", (_req, res) => {
        res.send("BACK END URL IS http://localhost:3000");
    });
    app.get("/PDF/:name", (_req, res) => {
        res.sendFile(path_1.default.join(path_1.default.resolve(__dirname, ".."), "src/public/" + _req.params.name));
    });
    app.listen(PORT, () => {
        console.log("\x1b[33m%s\x1b[0m", `NODEJS SERVER RUNNING ON PORT:${PORT}`);
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map