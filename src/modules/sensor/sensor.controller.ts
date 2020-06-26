import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { CreateSensorDto, ReadSensorDto, UpdateSensorDto } from './dto';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {

    constructor(
        private readonly _sensorService: SensorService
    ) { }

    @Get()
    getAll(): Promise<ReadSensorDto[]> {
        return this._sensorService.getAll();
    }

    @Get(':id')
    getOneById(
        @Param('id') id: number
    ): Promise<ReadSensorDto> {
        return this._sensorService.getOneById(id);
    }

    @Post()
    create(
        @Body() createSensorDto: CreateSensorDto
    ): Promise<ReadSensorDto> {
        return this._sensorService.create(createSensorDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateSensorDto: UpdateSensorDto
    ): Promise<ReadSensorDto> {
        return this._sensorService.update(id, updateSensorDto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number
    ): Promise<boolean> {
        return this._sensorService.delete(id);
    }

    @Patch(':id')
    activate(
        @Param('id') id: number
    ): Promise<boolean> {
        return this._sensorService.activate(id);
    }

}
