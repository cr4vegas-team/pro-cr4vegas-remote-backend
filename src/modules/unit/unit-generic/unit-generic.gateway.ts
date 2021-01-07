/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Inject } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { Server } from 'ws';

@WebSocketGateway(8882)
export class UnitGenericGateway {
  @WebSocketServer()
  private _server: Server;
  private _mqttClient: MqttClient;

  constructor(
    @Inject('MQTT_SERVICE')
    private _client: ClientMqtt,
  ) {
    this._mqttClient = this._client.createClient();
  }
  
  @SubscribeMessage('ws-client/unit/generic')
  handleMessage(client: any, data: string): any {
    const payloadJSON = JSON.parse(data);
    this._mqttClient.publish(payloadJSON.topic, payloadJSON.message);
    return undefined;
  }

  public emit(data: string): void {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/unit/generic', data }), // data = payload
      );
    });
  }

  @SubscribeMessage('ws-client/create/unit/generic')
  wsCreate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/create/unit/generic', dto: data }),
      );
    });
    return undefined;
  }

  @SubscribeMessage('ws-client/update/unit/generic')
  wsUpdate(client: any, data: string): any {
    this._server.clients.forEach(serverClient => {
      serverClient.send(
        JSON.stringify({ event: 'ws-server/update/unit/generic', dto: data }),
      );
    });
    return undefined;
  }
}
