import { RegistriesRO } from './dto/registry-response.dto';
import { RegistryService } from './registry.service';
export declare class RegistryController {
    private readonly _registryService;
    constructor(_registryService: RegistryService);
    findAll(): Promise<RegistriesRO>;
    findAllBySessionId(sessionId: number): Promise<RegistriesRO>;
}
