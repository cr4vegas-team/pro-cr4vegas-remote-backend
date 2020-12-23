import { OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
export declare class AppModule implements OnApplicationBootstrap {
    private readonly client;
    constructor(client: ClientProxy);
    onApplicationBootstrap(): void;
}
