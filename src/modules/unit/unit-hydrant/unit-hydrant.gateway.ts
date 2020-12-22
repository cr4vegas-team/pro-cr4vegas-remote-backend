/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8882)
export class UnitHydrantGateway {
  @WebSocketServer()
  private _server: Server;
  private _mqttClient: MqttClient;

  constructor(
    @Inject('MQTT_SERVICE')
    private _client: ClientMqtt,
  ) {
    this._mqttClient = this._client.createClient();
  }

  // ==================================================
  //  MQTT
  // ==================================================
  @SubscribeMessage('ws-client/unit/hydrant')
  handleMessage(client: any, data: string): string {
    const payloadJSON = JSON.parse(data);
    this._mqttClient.publish(payloadJSON.topic, payloadJSON.message);
    return undefined;
  }

  public emit(data: string): void {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/unit/hydrant', data }),
      ); // data = payload
    });
  }

  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/unit/hydrant')
  wsCreate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/create/unit/hydrant', data }),
      );
    });
    return undefined;
  }

  @SubscribeMessage('ws-client/update/unit/hydrant')
  wsUpdate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/update/unit/hydrant', data }),
      );
    });
    return undefined;
  }
}
