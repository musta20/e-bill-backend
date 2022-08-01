"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getConfig = () => {
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
        REDIS_PORT: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
    };
};
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
exports.default = sanitizedConfig;
//# sourceMappingURL=config.js.map