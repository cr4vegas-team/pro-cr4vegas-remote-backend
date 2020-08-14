
export default () => ({
    app: {
        port: parseInt(process.env.CR4VEGAS_BACK_APP_PORT, 10) || 3000,
        global_prefix: process.env.CR4VEGAS_BACK_APP_GLOBAL_PREFIX,
        jwt_secret: process.env.CR4VEGAS_BACK_JWT_SECRET,
    },
    database: {
        type: process.env.CR4VEGAS_BACK_DB_TYPE || "mysql",
        host: process.env.CR4VEGAS_BACK_DB_HOST || "localhost",
        port: Number(process.env.CR4VEGAS_BACK_DB_PORT) || 3306,
        username: process.env.CR4VEGAS_BACK_DB_USERNAME || "root",
        password: process.env.CR4VEGAS_BACK_DB_PASSWORD || "root",
        database: process.env.CR4VEGAS_BACK_DB_DATABASE || "cr4vegas_remote_test",
        synchronize: Boolean(process.env.CR4VEGAS_BACK_DB_TYPE) || true,
        entities: (process.env.CR4VEGAS_BACK_DB_ENTITIES).split('&') || [
            "dist/**/*.entity{.ts,.js}"
        ],
        seeds: (process.env.CR4VEGAS_BACK_DB_SEEDS).split('&') || [
            "src/database/seeds/**/*{.ts,.js}"
        ],
        factories: (process.env.CR4VEGAS_BACK_DB_FACTORIES).split('&') || [
            "src/database/factories/**/*{.ts,.js}"
        ]
    },
});