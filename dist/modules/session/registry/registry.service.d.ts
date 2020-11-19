import { RegistryCreateDto } from './dto/registry-create.dto';
import { SessionService } from '../session/session.service';
import { RegistryEntity } from './registry.entity';
import { Repository } from 'typeorm';
import { RegistriesRO, RegistryRO } from './dto/registry-response.dto';
export declare class RegistryService {
    private readonly _registryRepository;
    private readonly _sessionService;
    constructor(_registryRepository: Repository<RegistryEntity>, _sessionService: SessionService);
    findAll(): Promise<RegistriesRO>;
    findAllBySessionId(sessionId: number): Promise<RegistriesRO>;
    insertOne(registryCreateDto: RegistryCreateDto): Promise<RegistryRO>;
}
