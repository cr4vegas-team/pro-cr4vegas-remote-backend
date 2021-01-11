/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

export const events = {
  EVENT_UNIT_GENERIC: 'unit/generic',
  EVENT_UNIT_HYDRANT: 'unit/hydrant',
  EVENT_UNIT_POND: 'unit/pond',
  EVENT_STATION: 'station',
  EVENT_SECTOR: 'sector',
  EVENT_SET: 'set',
}

@WebSocketGateway(8882)
export class WsGateway {

  @WebSocketServer()
  private _server: Server;

  @SubscribeMessage(events.EVENT_UNIT_GENERIC)
  unitGeneric(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      if (serverClient != client) {
        serverClient.send(
          JSON.stringify({ event: events.EVENT_UNIT_GENERIC, dto: data }),
        );
      }
    });
    return undefined;
  }

  @SubscribeMessage(events.EVENT_UNIT_HYDRANT)
  unitHydrant(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      if (serverClient != client) {
        serverClient.send(
          JSON.stringify({ event: events.EVENT_UNIT_HYDRANT, dto: data }),
        );
      }
    });
    return undefined;
  }

  @SubscribeMessage(events.EVENT_UNIT_POND)
  unitPond(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      if (serverClient != client) {
        serverClient.send(
          JSON.stringify({ event: events.EVENT_UNIT_POND, dto: data }),
        );
      }
    });
    return undefined;
  }

  @SubscribeMessage(events.EVENT_STATION)
  station(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      if (serverClient != client) {
        serverClient.send(
          JSON.stringify({ event: events.EVENT_STATION, dto: data }),
        );
      }
    });
    return undefined;
  }

  @SubscribeMessage(events.EVENT_SECTOR)
  sector(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      if (serverClient != client) {
        serverClient.send(
          JSON.stringify({ event: events.EVENT_SECTOR, dto: data }),
        );
      }
    });
    return undefined;
  }

  @SubscribeMessage(events.EVENT_SET)
  set(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      if (serverClient != client) {
        serverClient.send(
          JSON.stringify({ event: events.EVENT_SET, dto: data }),
        );
      }
    });
    return undefined;
  }

}
