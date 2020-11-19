"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        port: parseInt(process.env.CR4VEGAS_BACK_APP_PORT, 10),
        global_prefix: process.env.CR4VEGAS_BACK_APP_GLOBAL_PREFIX,
        jwt_secret: process.env.CR4VEGAS_BACK_JWT_SECRET,
        multer_dest: process.env.MULTER_DEST,
    },
    database: {
        type: process.env.CR4VEGAS_BACK_DB_TYPE,
        host: process.env.CR4VEGAS_BACK_DB_HOST,
        port: Number(process.env.CR4VEGAS_BACK_DB_PORT),
        username: process.env.CR4VEGAS_BACK_DB_USERNAME,
        password: process.env.CR4VEGAS_BACK_DB_PASSWORD,
        database: process.env.CR4VEGAS_BACK_DB_DATABASE,
        synchronize: Boolean(process.env.CR4VEGAS_BACK_DB_SYNCHRONIZE),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        seeds: ['src/database/seeds/**/*{.ts,.js}'],
        factories: ['src/database/factories/**/*{.ts,.js}'],
        keepConnectionAlive: true,
    },
    logger: {
        path: '/logs',
    },
});
//# sourceMappingURL=configuration.js.map