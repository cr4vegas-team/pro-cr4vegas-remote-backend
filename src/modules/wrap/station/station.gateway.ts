import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class StationGateway {
  // ==================================================
  //  WS
  // ==================================================
  @SubscribeMessage('ws-client/create/station')
  wsCreate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/station', unitHydrant);
    return undefined;
  }

  @SubscribeMessage('ws-client/update/station')
  wsUpdate(client: Socket, unitHydrant: string): string {
    client.broadcast.emit('ws-server/create/station', unitHydrant);
    return undefined;
  }
}
