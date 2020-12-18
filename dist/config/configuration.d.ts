declare const _default: () => {
    app: {
        port: number;
        global_prefix: string;
        jwt_secret: string;
        multer_dest: string;
    };
    mqtt: {
        url: string;
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        entities: string[];
        seeds: string[];
        factories: string[];
        keepConnectionAlive: boolean;
    };
    logger: {
        path: string;
    };
};
export default _default;
