import { Controller, UseFilters } from '@nestjs/common';
import { SensorExceptionFilter } from './sensor.exception';
import { SensorService } from './sensor.service';

@Controller('sensor')
@UseFilters(SensorExceptionFilter)
export class SensorController {

    constructor(
        private readonly _sensorService: SensorService
    ) { }

    

}
