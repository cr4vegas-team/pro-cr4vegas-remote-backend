import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'typeorm';

@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class UnitPondGateway {
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
  @SubscribeMessage('ws-client/unit/pond')
  handleMessage(client: Socket, payload: string): string {
    const payloadJSON = JSON.parse(payload);
    this._mqttClient.publish(payloadJSON.topic, payloadJSON.message);
    return undefined;
  }

  public emit(packet: string): void {
    this._server.emit('ws-server/unit/pond', packet);
  }

  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/unit/pond')
  wsCreate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/unit/pond', unitHydrant);
    return undefined;
  }

  @SubscribeMessage('ws-client/update/unit/pond')
  wsUpdate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/unit/pond', unitHydrant);
    return undefined;
  }
}
