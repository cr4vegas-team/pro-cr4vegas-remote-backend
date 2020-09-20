import { ControlCreateDto } from './dto/control-create.dto';
import { ControlService } from './control.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ControlRO, ControlsRO } from './control.interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('control')
@Controller('control')
export class ControlController {

    constructor(
        private readonly _controlService: ControlService
    ) {}

    @Get()
    findAll(): Promise<ControlsRO> {
        return this._controlService.findAll();
    }

    @Get(':userId')
    findAllByUserId(@Param('userId') userId: number): Promise<ControlsRO> {
        return this._controlService.findAllByUserId(userId);
    }

    @Post()
    insertOne(@Body() dto: ControlCreateDto): Promise<ControlRO> {
        return this._controlService.insertOne(dto);
    }

}
