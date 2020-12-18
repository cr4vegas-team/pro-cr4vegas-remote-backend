import { Inject, UseGuards } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/modules/auth/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway()
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
  handleMessage(client: Socket, payload: string): string {
    const payloadJSON = JSON.parse(payload);
    this._mqttClient.publish(payloadJSON.topic, payloadJSON.message);
    return undefined;
  }

  public emit(packet: string): void {
    this._server.emit('ws-server/unit/hydrant', packet);
  }

  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/unit/hydrant')
  wsCreate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/unit/hydrant', unitHydrant);
    return undefined;
  }

  @SubscribeMessage('ws-client/update/unit/hydrant')
  wsUpdate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/unit/hydrant', unitHydrant);
    return undefined;
  }
}
