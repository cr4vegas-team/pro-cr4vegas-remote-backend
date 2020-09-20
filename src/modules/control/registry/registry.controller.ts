import { RegistryCreateDto } from './registry-create.dto';
import { RegistryService } from './registry.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegistriesRO, RegistryRO } from './registry.interfaces';
import { ApiTags } from '@nestjs/swagger';

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

    @Get(':controlId')
    findAllByControlId(@Param('controlId') controlId: number): Promise<RegistriesRO> {
        console.log('asdf');
        return this._registryService.findAllByControlId(controlId);
    }

    @Post()
    insertOne(@Body() registryCreateDto: RegistryCreateDto): Promise<RegistryRO> {
        return this._registryService.insertOne(registryCreateDto);
    }

}
