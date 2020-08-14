import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SetDto } from './set.dto';
import { SetRO, SetsRO } from './set.interfaces';
import { SetService } from './set.service';

@ApiTags('set')
@Controller('set')
export class SetController {

    constructor(
        private readonly _setService: SetService
    ) { }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @Get()
    findAll(@Query('active') active: number): Promise<SetsRO> {
        return this._setService.findAll(active);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiParam({ name: 'id', type: Number, required: true })
    @Get(':id')
    findOne(@Param('id') id: number, @Query('active') active: number): Promise<SetRO> {
        return this._setService.findOne(id, active);
    }

    @Post()
    createOne(@Body() dto: SetDto): Promise<SetRO> {
        return this._setService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: SetDto): Promise<boolean> {
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
