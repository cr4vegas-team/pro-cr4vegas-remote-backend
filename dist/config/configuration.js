"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        port: parseInt(process.env.CR4VEGAS_BACK_APP_PORT, 10) || 8881,
        global_prefix: process.env.CR4VEGAS_BACK_APP_GLOBAL_PREFIX,
        jwt_secret: process.env.CR4VEGAS_BACK_JWT_SECRET,
    },
    database: {
        type: process.env.CR4VEGAS_BACK_DB_TYPE || "mysql",
        host: process.env.CR4VEGAS_BACK_DB_HOST || "172.20.48.1",
        port: Number(process.env.CR4VEGAS_BACK_DB_PORT) || 3306,
        username: process.env.CR4VEGAS_BACK_DB_USERNAME || "root",
        password: process.env.CR4VEGAS_BACK_DB_PASSWORD || "mysql1819",
        database: process.env.CR4VEGAS_BACK_DB_DATABASE || "cr4vegas_remote_test",
        synchronize: Boolean(process.env.CR4VEGAS_BACK_DB_SYNCHRONIZE) || true,
        entities: [
            __dirname + "/../**/*.entity{.ts,.js}"
        ],
        seeds: [
            "src/database/seeds/**/*{.ts,.js}"
        ],
        factories: [
            "src/database/factories/**/*{.ts,.js}"
        ],
        keepConnectionAlive: true,
    },
});
//# sourceMappingURL=configuration.js.map