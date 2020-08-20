declare const _default: () => {
    app: {
        port: number;
        global_prefix: string;
        jwt_secret: string;
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
    };
};
export default _default;
