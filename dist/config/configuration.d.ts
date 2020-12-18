import { Transport } from '@nestjs/microservices';
declare const _default: () => {
    app: {
        port: number;
        global_prefix: string;
        jwt_secret: string;
        multer_dest: string;
    };
    mqtt: {
        transport: Transport;
        options: {
            url: string;
            rejectUnauthorized: boolean;
        };
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
