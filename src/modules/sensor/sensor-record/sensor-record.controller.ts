import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateSensorRecordDto, ReadSensorRecordDto } from './dto';
import { SensorRecordService } from './sensor-record.service';

@Controller('sensor-record')
export class SensorRecordController {

    constructor(
        private readonly _sensorRecordService: SensorRecordService
    ) { }

    @Get(':id/:rows')
    getAll(@Param('id') id: number, @Param('rows') rows: number): Promise<ReadSensorRecordDto[]> {
        return this._sensorRecordService.getAll(id, rows);
    }

    @Get()
    getAllBySensorId(@Query('sensor_id') sensor_id: number): Promise<ReadSensorRecordDto[]> {
        return this._sensorRecordService.getAllBySensorId(sensor_id);
    }

    @Post()
    create(@Body() dto: CreateSensorRecordDto): Promise<ReadSensorRecordDto> {
        return this._sensorRecordService.create(dto);
    }

}
