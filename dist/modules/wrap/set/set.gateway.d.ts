import { Socket } from 'socket.io';
export declare class SetGateway {
    wsCreate(client: Socket, unitHydrant: string): string;
    wsUpdate(client: Socket, unitHydrant: string): string;
}
