/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8882)
export class StationGateway {
  @WebSocketServer()
  private _server: Server;
  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/station')
  wsCreate(client: any, dto: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/update/station', dto }),
      );
    });
    return undefined;
  }

  @SubscribeMessage('ws-client/update/station')
  wsUpdate(client: any, dto: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/update/station', dto }),
      );
    });
    return undefined;
  }
}
