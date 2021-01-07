/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject } from '@nestjs/common';
import {
  ClientMqtt
} from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { Server } from 'ws';

@WebSocketGateway(8882)
export class UnitPondGateway implements OnGatewayInit {
  @WebSocketServer()
  private _server: Server;
  private _mqttClient: MqttClient;

  constructor(
    @Inject('MQTT_SERVICE')
    private _client: ClientMqtt,
  ) {
    this._mqttClient = this._client.createClient();
  }
  afterInit(server: Server) {
    server.setMaxListeners(0);
  }

  @SubscribeMessage('ws-client/unit/pond')
  handleMessage(client: any, data: string): any {
    const payloadJSON = JSON.parse(data);
    this._mqttClient.publish(payloadJSON.topic, payloadJSON.message); // data = payload
    return undefined;
  }

  public emit(data: string): void {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/unit/hydrant', data }),
      );
    });
  }

  @SubscribeMessage('ws-client/create/unit/pond')
  wsCreate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/create/unit/pond', data }),
      );
    });
    return undefined;
  }

  @SubscribeMessage('ws-client/update/unit/pond')
  wsUpdate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/update/unit/pond', data }),
      );
    });
    return undefined;
  }
}
