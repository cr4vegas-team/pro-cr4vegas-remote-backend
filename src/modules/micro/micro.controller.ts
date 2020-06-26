import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { CreateMicroDto, ReadMicroDto, UpdateMicroDto } from './dto';
import { MicroService } from './micro.service';

@Controller('micro')
export class MicroController {

    constructor(private readonly _microService: MicroService) { }

    @Get()
    getAll(): Promise<ReadMicroDto[]> {
        return this._microService.getAll();
    }

    @Get(':unit_code')
    getAllByUnit(@Param() unit_code: string): Promise<ReadMicroDto[]> {
        return this._microService.getAllByUnit(unit_code);
    }

    @Get(':id')
    getOneById(
        @Param('id') id: number
    ): Promise<ReadMicroDto> {
        return this._microService.getOneById(id);
    }

    @Post()
    create(
        @Body() createMicroDto: CreateMicroDto
    ): Promise<ReadMicroDto> {
        return this._microService.create(createMicroDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateMicroDto: UpdateMicroDto
    ): Promise<ReadMicroDto> {
        console.log(updateMicroDto);
        return this._microService.update(id, updateMicroDto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number
    ): Promise<boolean> {
        return this._microService.delete(id);
    }

    @Patch(':id')
    activate(
        @Param('id') id: number
    ): Promise<boolean> {
        return this._microService.activate(id);
    }

}
