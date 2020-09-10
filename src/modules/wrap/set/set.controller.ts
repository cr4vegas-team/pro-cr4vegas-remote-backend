import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SetCreateDto } from './dto/set-create.dto';
import { SetTypeUpdateDto, SetUpdateDto } from './dto/set-update.dto';
import { SetTypeEntity } from './set-type.entity';
import { SetRO, SetsRO } from './set.interfaces';
import { SetService } from './set.service';

@ApiTags('set')
@Controller('set')
export class SetController {

    constructor(
        private readonly _setService: SetService
    ) { }

    @Get('all')
    findAll(): Promise<SetsRO> {
        return this._setService.findAll();
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Get('one/:id')
    findOne(@Param('id') id: number): Promise<SetRO> {
        return this._setService.findOneWithUnits(id);
    }

    @Post()
    createOne(@Body() dto: SetCreateDto): Promise<SetRO> {
        return this._setService.createOne(dto);
    }

    @Put()
    updateOne(@Body() dto: SetUpdateDto): Promise<SetRO> {
        return this._setService.updateOne(dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<boolean> {
        return this._setService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<boolean> {
        return this._setService.activateOne(id);
    }

    @Get('set-type')
    findAllSetTypes(): Promise<SetTypeEntity[]> {
        return this._setService.findAllSetTypes();
    }

    @Post('set-type')
    insertSetType(@Body() dto: SetTypeEntity): Promise<SetTypeEntity> {
        return this._setService.insertSetType(dto);
    }

    @Delete('set-type/:name')
    deleteSetType(@Param('name') name: string): Promise<boolean> {
        return this._setService.deleteSetType(name);
    }

    @Put('set-type')
    updateSetType(@Body() dto: SetTypeUpdateDto): Promise<SetTypeEntity> {
        return this._setService.updateSetType(dto);
    }
}
