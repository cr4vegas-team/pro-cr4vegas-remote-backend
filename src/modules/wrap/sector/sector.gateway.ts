import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class SectorGateway {
  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/sector')
  wsCreate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/sector', unitHydrant);
    return undefined;
  }

  @SubscribeMessage('ws-client/update/sector')
  wsUpdate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/sector', unitHydrant);
    return undefined;
  }
}
