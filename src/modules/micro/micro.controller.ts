import { Body, Controller, Delete, Get, Param, Post, Put, Patch, Query } from '@nestjs/common';
import { CreateMicroDto, ReadMicroDto, UpdateMicroDto } from './dto';
import { MicroService } from './micro.service';
import { MicrosRO, MicroRO } from './micro.interfaces';

@Controller('micro')
export class MicroController {

    constructor(private readonly _microService: MicroService) { }

    @Get()
    getAll(@Query() query): Promise<MicrosRO> {
        return this._microService.getAll(query);
    }

    @Get('unit')
    getAllByUnit(@Query('unit_code') unit_code: string, @Query() query): Promise<MicrosRO> {
        return this._microService.getAllByUnit(unit_code, query);
    }

    @Get('id')
    getOneById(
        @Query('id') id: number,
        @Query() query
    ): Promise<MicroRO> {
        return this._microService.getOneById(id, query);
    }

    @Post()
    create(
        @Body() createMicroDto: CreateMicroDto
    ): Promise<MicroRO> {
        return this._microService.create(createMicroDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateMicroDto: UpdateMicroDto,
        @Query() query: any
    ): Promise<MicroRO> {
        return this._microService.update(id, updateMicroDto, query);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number
    ): Promise<MicroRO> {
        return this._microService.delete(id);
    }

    @Patch(':id')
    activate(
        @Param('id') id: number
    ): Promise<MicroRO> {
        return this._microService.activate(id);
    }

}
