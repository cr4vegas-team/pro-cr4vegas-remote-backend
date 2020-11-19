import { SessionEntity } from '../session/session.entity';
import { plainToClass } from 'class-transformer';
import { RegistryCreateDto } from './dto/registry-create.dto';
import { SessionService } from '../session/session.service';
import { RegistryEntity } from './registry.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistriesRO, RegistryRO } from './dto/registry-response.dto';

@Injectable()
export class RegistryService {

    constructor(
        @InjectRepository(RegistryEntity)
        private readonly _registryRepository: Repository<RegistryEntity>,
        private readonly _sessionService: SessionService
    ) { }

    async findAll(): Promise<RegistriesRO> {
        const qb = this._registryRepository.createQueryBuilder('registries');
        const registries: RegistryEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { registries, count };
    }

    async findAllBySessionId(sessionId: number): Promise<RegistriesRO> {
        const qb = this._registryRepository.createQueryBuilder('registries')
            .leftJoinAndSelect('registries.session', 'session')
            .where('session.id = :id', { id: sessionId });
        const registries: RegistryEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { registries, count };
    }

    async insertOne(registryCreateDto: RegistryCreateDto): Promise<RegistryRO> {
        const registryEntity: RegistryEntity = plainToClass(RegistryEntity, registryCreateDto);
        const foundSession: SessionEntity = (await this._sessionService.findOneById(registryCreateDto.session)).session;
        registryEntity.session = foundSession;
        const savedRegistry: RegistryEntity = await this._registryRepository.save(registryEntity);
        return { registry: savedRegistry };
    }

}
