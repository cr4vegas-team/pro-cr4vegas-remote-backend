import { Controller, UseFilters, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { MicroExceptionFilter } from './exception/unit.exception';
import { MicroService } from './micro.service';
import { ReadMicroDto, CreateMicroDto, UpdateMicroDto } from './dto';

@Controller('micro')
//@UseFilters(MicroExceptionFilter)
export class MicroController {

    constructor(
        private readonly _microService: MicroService
    ) { }

    @Get()
    getAll(): Promise<ReadMicroDto[]> {
        return this._microService.getMicros();
    }

    @Get(':id')
    getOneById(
        @Param('id') id: number
    ): Promise<ReadMicroDto> {
        return this._microService.getMicroById(id);
    }

    @Post()
    create(
        @Body() createMicroDto: CreateMicroDto
    ): Promise<ReadMicroDto> {
        return this._microService.createMicro(createMicroDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateMicroDto: UpdateMicroDto
    ): Promise<ReadMicroDto> {
        return this._microService.updateMicro(id, updateMicroDto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number
    ): Promise<boolean> {
        return this._microService.deleteMicro(id);
    }

}
