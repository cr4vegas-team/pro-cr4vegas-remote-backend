import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { CreateSensorTypeDto, ReadSensorTypeDto, UpdateSensorTypeDto } from './dto';
import { SensorTypeService } from './sensor-type.service';


@Controller('sensor-type')
export class SensorTypeController {

    constructor(private readonly _sensorTypeService: SensorTypeService) { }

    @Get()
    getAll(): Promise<ReadSensorTypeDto[]> {
        return this._sensorTypeService.getAll();
    }

    @Get(':type')
    getOneByType(
        @Param('type') type: string
    ): Promise<ReadSensorTypeDto> {
        return this._sensorTypeService.getOneByType(type);
    }

    @Post()
    create(
        @Body() createSensorTypeDto: CreateSensorTypeDto
    ): Promise<ReadSensorTypeDto> {
        return this._sensorTypeService.create(createSensorTypeDto);
    }

    @Put(':type')
    update(
        @Param('type') type: string,
        @Body() updateSensorTypeDto: UpdateSensorTypeDto
    ): Promise<boolean> {
        return this._sensorTypeService.update(type, updateSensorTypeDto);
    }

    @Delete(':type')
    delete(
        @Param('type') type: string
    ): Promise<boolean> {
        return this._sensorTypeService.delete(type);
    }

    @Patch(':type')
    activate(
        @Param('type') type: string,
    ): Promise<boolean> {
        return this._sensorTypeService.activate(type);
    }

}
