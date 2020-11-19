import { SessionExceptionMSG } from './session-exception.msg';
import { SessionCreateDto } from './dto/session-create.dto';
import { SessionService } from './session.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SessionRO, SessionsRO } from './dto/session-response.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('control')
@Controller('control')
export class SessionController {
  constructor(private readonly _controlService: SessionService) {}

  @Get()
  findAll(): Promise<SessionsRO> {
    return this._controlService.findAll();
  }

  @Get(':userId')
  findAllByUserId(@Param('userId') userId: number): Promise<SessionsRO> {
    return this._controlService.findAllByUserId(userId);
  }

  @ApiNotFoundResponse({ description: SessionExceptionMSG.NOT_FOUND })
  @Post()
  insertOne(@Body() dto: SessionCreateDto): Promise<SessionRO> {
    return this._controlService.startSession(dto);
  }
}
