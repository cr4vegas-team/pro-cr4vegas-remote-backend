import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class SetGateway {
  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/set')
  wsCreate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/set', unitHydrant);
    return undefined;
  }

  @SubscribeMessage('ws-client/update/set')
  wsUpdate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/set', unitHydrant);
    return undefined;
  }
}
