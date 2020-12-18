// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => ({
  app: {
    port: parseInt(process.env.CR4VEGAS_BACK_APP_PORT, 10),
    global_prefix: process.env.CR4VEGAS_BACK_APP_GLOBAL_PREFIX,
    jwt_secret: process.env.CR4VEGAS_BACK_JWT_SECRET,
    multer_dest: process.env.MULTER_DEST,
  },
  mqtt: {
    url: process.env.CR4VEGAS_BACK_MQTT_URL,
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
