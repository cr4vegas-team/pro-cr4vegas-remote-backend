import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { ActionService } from './action.service';
import { ActionCreateDto } from './dto/action-create.dto';
import { ActionRO, ActionsRO } from './dto/action-response.dto';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('action')
@Controller('action')
export class ActionController {

    constructor(
        private readonly _actionService: ActionService
    ) { }

    @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
    @Get()
    findAll(): Promise<ActionsRO> {
        return this._actionService.findAll();
    }

    @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
    @Get(':sessionId')
    findAllBySessionId(@Param('sessionId') sessionId: number): Promise<ActionsRO> {
        return this._actionService.findAllBySessionId(sessionId);
    }

    @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
    @Post()
    insertOne(@Body() manageCreateDto: ActionCreateDto): Promise<ActionRO> {
        return this._actionService.insertOne(manageCreateDto);
    }

}
