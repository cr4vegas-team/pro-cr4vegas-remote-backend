import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SetDto } from './set.dto';
import { SetRO, SetsRO } from './set.interfaces';
import { SetService } from './set.service';

@Controller('set')
export class SetController {

    constructor(
        private readonly _setService: SetService
    ) { }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @Get()
    findAll(@Query() query: Object): Promise<SetsRO> {
        return this._setService.findAll(query);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @Get('one')
    findOne(@Query() query: Object): Promise<SetRO> {
        return this._setService.findOne(query);
    }

    @Post()
    createOne(@Body() dto: SetDto): Promise<SetRO> {
        return this._setService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: SetDto): Promise<SetRO> {
        return this._setService.updateOne(id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<Boolean> {
        return this._setService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<Boolean> {
        return this._setService.activateOne(id);
    }

}
