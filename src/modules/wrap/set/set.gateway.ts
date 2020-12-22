/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8882)
export class SetGateway {
  @WebSocketServer()
  private _server: Server;
  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/set')
  wsCreate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/create/set', dto: data }),
      );
    });
    return undefined;
  }

  @SubscribeMessage('ws-client/update/set')
  wsUpdate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/update/set', data }),
      );
    });
    return undefined;
  }
}
