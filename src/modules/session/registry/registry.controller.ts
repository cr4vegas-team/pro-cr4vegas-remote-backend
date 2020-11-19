import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegistriesRO } from './dto/registry-response.dto';
import { RegistryService } from './registry.service';

@ApiTags('registry')
@Controller('registry')
export class RegistryController {

    constructor(
        private readonly _registryService: RegistryService
    ) { }

    @Get()
    findAll(): Promise<RegistriesRO> {
        return this._registryService.findAll();
    }

    @Get(':sessionId')
    findAllBySessionId(@Param('sessionId') sessionId: number): Promise<RegistriesRO> {
        console.log('asdf');
        return this._registryService.findAllBySessionId(sessionId);
    }

}
