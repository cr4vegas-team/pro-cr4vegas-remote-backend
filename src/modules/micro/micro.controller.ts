import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { CreateMicroDto, ReadMicroDto, UpdateMicroDto } from './dto';
import { MicroService } from './micro.service';
import { MicroExceptionFilter } from './unit.exception';

@Controller('micro')
@UseFilters(MicroExceptionFilter)
export class MicroController {

    constructor(private readonly _microService: MicroService) { }

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
        console.log(updateMicroDto);
        return this._microService.updateMicro(id, updateMicroDto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number
    ): Promise<boolean> {
        return this._microService.deleteMicro(id);
    }

}
