"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRedisConfig = (redis, RedisStore) => {
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
        resave: false,
    };
};
exports.default = getRedisConfig;
//# sourceMappingURL=RedisConfig.js.map