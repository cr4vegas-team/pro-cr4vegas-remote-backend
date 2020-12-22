import { ClientMqtt } from '@nestjs/microservices';
export declare class UnitPondGateway {
    private _client;
    private _server;
    private _mqttClient;
    constructor(_client: ClientMqtt);
    handleMessage(client: any, data: string): any;
    emit(data: string): void;
    wsCreate(client: any, data: string): any;
    wsUpdate(client: any, data: string): any;
}
