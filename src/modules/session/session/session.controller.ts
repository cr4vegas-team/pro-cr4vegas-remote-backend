import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionsRO } from './dto/session-response.dto';
import { SessionService } from './session.service';
import { Roles } from 'src/modules/auth/user/user-role.decorator';
import { UserRole } from 'src/modules/auth/user/user-role.enum';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('session')
@Controller('session')
export class SessionController {
  constructor(private readonly _controlService: SessionService) { }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @Get()
  findAll(): Promise<SessionsRO> {
    return this._controlService.findAll();
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @Get(':userId')
  findAllByUserId(@Param('userId') userId: number): Promise<SessionsRO> {
    return this._controlService.findAllByUserId(userId);
  }
}
