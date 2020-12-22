/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8882)
export class SectorGateway {
  @WebSocketServer()
  private _server: Server;
  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/sector')
  wsCreate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/create/sector', data }),
      );
    });
    return undefined;
  }

  @SubscribeMessage('ws-client/update/sector')
  wsUpdate(client: any, dto: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/update/sector', dto }),
      );
    });
    return undefined;
  }
}
