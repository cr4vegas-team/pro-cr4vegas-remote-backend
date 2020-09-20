import { RegistryCreateDto } from './registry-create.dto';
import { ControlService } from './../control/control.service';
import { RegistryEntity } from './registry.entity';
import { Repository } from 'typeorm';
import { RegistriesRO, RegistryRO } from './registry.interfaces';
export declare class RegistryService {
    private readonly _registryRepository;
    private readonly _controlService;
    constructor(_registryRepository: Repository<RegistryEntity>, _controlService: ControlService);
    findAll(): Promise<RegistriesRO>;
    findAllByControlId(controlId: number): Promise<RegistriesRO>;
    insertOne(registryCreateDto: RegistryCreateDto): Promise<RegistryRO>;
}
