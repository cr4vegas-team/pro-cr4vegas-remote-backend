import { ClientMqtt } from '@nestjs/microservices';
import { Socket } from 'socket.io';
export declare class UnitPondGateway {
    private _client;
    private _server;
    private _mqttClient;
    constructor(_client: ClientMqtt);
    handleMessage(client: Socket, payload: string): string;
    emit(packet: string): void;
    wsCreate(client: Socket, unitHydrant: string): string;
    wsUpdate(client: Socket, unitHydrant: string): string;
}
