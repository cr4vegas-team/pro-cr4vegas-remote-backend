/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SessionService } from '../session/session.service';
import { RegistriesRO, RegistryDto } from './dto/registry-response.dto';
import { RegistryEntity } from './registry.entity';

@Injectable()
export class RegistryService {

    constructor(
        @InjectRepository(RegistryEntity)
        private readonly _registryRepository: Repository<RegistryEntity>,
        private readonly _sessionService: SessionService
    ) { }

    async findAll(): Promise<RegistriesRO> {
        const qb = this._registryRepository.createQueryBuilder('registries')
            .leftJoinAndSelect('registries.session', 'session');
        const registries: RegistryEntity[] = await qb.getMany();
        const registriesDto: RegistryDto[] = registries.map(registry => {
            const registryDto = new RegistryDto();
            registryDto.id = registry.id;
            registryDto.session = registry.session;
            registryDto.method = registry.method;
            registryDto.originalUrl = registry.originalUrl;
            registryDto.body = JSON.parse(registry.body);
            return registryDto;
        });
        const count: number = await qb.getCount();
        return { registries: registriesDto, count };
    }
    f
    async findAllBySessionId(sessionId: number): Promise<RegistriesRO> {
        const qb = this._registryRepository.createQueryBuilder('registries')
            .leftJoinAndSelect('registries.session', 'session')
            .where('session.id = :id', { id: sessionId });
        const registries: RegistryEntity[] = (await qb.getMany()).map(registry => {
            const registryDto = new RegistryDto();
            registryDto.id = registry.id;
            registryDto.session = registry.session;
            registryDto.method = registry.method;
            registryDto.originalUrl = registry.originalUrl;
            registryDto.body = JSON.parse(registry.body);
            return registryDto;
        });
        const count: number = await qb.getCount();
        return { registries, count };
    }

    async insertOne(req: any): Promise<void> {
        const method = req.method;
        const originalUrl = req.originalUrl;
        const body = req.body;
        const registryEntity: RegistryEntity = new RegistryEntity();
        registryEntity.session = req.user.session;
        registryEntity.method = method;
        registryEntity.originalUrl = originalUrl;
        registryEntity.body = JSON.stringify(body);
        const savedRegistry: RegistryEntity = await this._registryRepository.save(registryEntity);
    }

    async deleteAll(): Promise<number> {
        const deleteResult: DeleteResult = await this._registryRepository.createQueryBuilder('registries').delete().where("id >= :id", { id: 0 }).execute();
        return deleteResult.affected;
    }

}
