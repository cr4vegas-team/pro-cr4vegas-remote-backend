import { ActionCreateDto } from './dto/action-create.dto';
import { ActionService } from './action.service';
import { Body, Get, Param, Post, Controller } from '@nestjs/common';
import { ActionRO, ActionsRO } from './dto/action-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('action')
@Controller('action')
export class ActionController {

    constructor(
        private readonly _actionService: ActionService
    ) { }

    @Get()
    findAll(): Promise<ActionsRO> {
        return this._actionService.findAll();
    }

    @Get(':sessionId')
    findAllBySessionId(@Param('sessionId') sessionId: number): Promise<ActionsRO> {
        return this._actionService.findAllBySessionId(sessionId);
    }

    @Post()
    insertOne(@Body() manageCreateDto: ActionCreateDto): Promise<ActionRO> {
        return this._actionService.insertOne(manageCreateDto);
    }

}
