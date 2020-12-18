import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
export declare class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private _server;
    private _users;
    get server(): Server;
    afterInit(server: Server): Promise<void>;
    handleConnection(client: Client, ...args: any[]): void;
    handleDisconnect(client: any): void;
    handleEvent(data: string): string;
}
