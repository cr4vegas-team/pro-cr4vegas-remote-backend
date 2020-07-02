import { Body, Controller, Delete, Get, Param, Post, Put, Patch, UsePipes, Query } from '@nestjs/common';
import { CreateSensorDto, ReadSensorDto, UpdateSensorDto } from './dto';
import { SensorService } from './sensor.service';
import { NumberArrayValidationPipe } from 'src/global/pipes/number-array-validation.pipe';

@Controller('sensor')
export class SensorController {

    constructor(
        private readonly _sensorService: SensorService
    ) { }

    @Get(':id/:rows')
    getAll(@Param('id') id: number, @Param('rows') rows: number): Promise<ReadSensorDto[]> {
        return this._sensorService.getAll(id, rows);
    }

    @Get()
    getOneById(
        @Query('id') id: number
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

    @Delete()
    @UsePipes(NumberArrayValidationPipe)
    delete(
        @Query('ids') ids: number[]
    ): Promise<boolean> {
        return this._sensorService.delete(ids);
    }

    @Patch()
    @UsePipes(NumberArrayValidationPipe)
    activate(
        @Query('id') ids: number[]
    ): Promise<boolean> {
        return this._sensorService.activate(ids);
    }

}
