import { RegistryCreateDto } from './registry-create.dto';
import { RegistryService } from './registry.service';
import { RegistriesRO, RegistryRO } from './registry.interfaces';
export declare class RegistryController {
    private readonly _registryService;
    constructor(_registryService: RegistryService);
    findAll(): Promise<RegistriesRO>;
    findAllByControlId(controlId: number): Promise<RegistriesRO>;
    insertOne(registryCreateDto: RegistryCreateDto): Promise<RegistryRO>;
}
