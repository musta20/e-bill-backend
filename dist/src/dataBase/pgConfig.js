"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bill_1 = require("../entits/Bill");
const Product_1 = require("../entits/Product");
const User_1 = require("../entits/User");
const config_1 = __importDefault(require("../../config"));
const typeormconfig = {
    type: config_1.default.DB_TYPE,
    host: config_1.default.DB_HOST,
    port: config_1.default.DB_PORT,
    username: config_1.default.DB_USERNAME,
    password: config_1.default.DB_PASSWORD,
    database: config_1.default.DB_NAME,
    entities: [Bill_1.Bill, User_1.User, Product_1.Product],
    synchronize: true,
    logging: config_1.default.DB_LOGGING
};
exports.default = typeormconfig;
//# sourceMappingURL=pgConfig.js.map