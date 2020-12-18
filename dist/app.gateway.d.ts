import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class AppGateway implements OnGatewayInit {
    constructor();
    afterInit(server: Server): void;
}
