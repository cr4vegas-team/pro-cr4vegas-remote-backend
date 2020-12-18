import { Socket } from 'socket.io';
export declare class StationGateway {
    wsCreate(client: Socket, unitHydrant: string): string;
    wsUpdate(client: Socket, unitHydrant: string): string;
}
