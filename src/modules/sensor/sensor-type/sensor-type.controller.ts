import { Body, Controller, Delete, Get, Param, Post, Put, Patch, Query, ParseArrayPipe, UsePipes } from '@nestjs/common';
import { CreateSensorTypeDto, ReadSensorTypeDto, UpdateSensorTypeDto } from './dto';
import { SensorTypeService } from './sensor-type.service';
import { NumberArrayValidationPipe } from 'src/global/pipes/number-array-validation.pipe';


@Controller('sensor-type')
export class SensorTypeController {

    constructor(private readonly _sensorTypeService: SensorTypeService) { }

    @Get(':id/:rows')
    getAll(@Param('id') id: number, @Param('rows') rows: number): Promise<ReadSensorTypeDto[]> {
        return this._sensorTypeService.getAll(id, rows);
    }

    @Get()
    getOneByType(
        @Query('id') id: number
    ): Promise<ReadSensorTypeDto> {
        return this._sensorTypeService.getOneByType(id);
    }

    @Post()
    create(
        @Body() createSensorTypeDto: CreateSensorTypeDto
    ): Promise<ReadSensorTypeDto> {
        return this._sensorTypeService.create(createSensorTypeDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateSensorTypeDto: UpdateSensorTypeDto
    ): Promise<boolean> {
        return this._sensorTypeService.update(id, updateSensorTypeDto);
    }

    @Delete()
    @UsePipes(NumberArrayValidationPipe)
    delete(
        @Query('ids') ids: number[]
    ): Promise<boolean> {
        console.log(ids);
        return this._sensorTypeService.delete(ids);
    }

    @Patch()
    @UsePipes(NumberArrayValidationPipe)
    activate(
        @Query('ids') ids: number[],
    ): Promise<boolean> {
        return this._sensorTypeService.activate(ids);
    }

}
