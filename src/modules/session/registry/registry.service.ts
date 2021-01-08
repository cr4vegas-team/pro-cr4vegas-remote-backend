/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionService } from '../session/session.service';
import { RegistriesRO } from './dto/registry-response.dto';
import { RegistryEntity } from './registry.entity';

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

    async insertOne(req: any): Promise<void> {
        const msg = req.method + " " + req.originalUrl + " " + JSON.stringify(req.body);
        const registryEntity: RegistryEntity = new RegistryEntity();
        registryEntity.session = req.user.session;
        registryEntity.message = msg;
        const savedRegistry: RegistryEntity = await this._registryRepository.save(registryEntity);
    }

}
