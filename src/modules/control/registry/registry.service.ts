import { ControlEntity } from './../control/control.entity';
import { plainToClass } from 'class-transformer';
import { RegistryCreateDto } from './registry-create.dto';
import { ControlService } from './../control/control.service';
import { RegistryEntity } from './registry.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistriesRO, RegistryRO } from './registry.interfaces';

@Injectable()
export class RegistryService {

    constructor(
        @InjectRepository(RegistryEntity)
        private readonly _registryRepository: Repository<RegistryEntity>,
        private readonly _controlService: ControlService
    ) { }

    async findAll(): Promise<RegistriesRO> {
        const qb = this._registryRepository.createQueryBuilder('registries');
        const registries: RegistryEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { registries, count };
    }

    async findAllByControlId(controlId: number): Promise<RegistriesRO> {
        const qb = this._registryRepository.createQueryBuilder('registries')
            .leftJoinAndSelect('registries.control', 'control')
            .where('control.id = :id', { id: controlId });
        const registries: RegistryEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { registries, count };
    }

    async insertOne(registryCreateDto: RegistryCreateDto): Promise<RegistryRO> {
        const registryEntity: RegistryEntity = plainToClass(RegistryEntity, registryCreateDto);
        const foundControl: ControlEntity = (await this._controlService.findOneById(registryCreateDto.control)).control;
        registryEntity.control = foundControl;
        const savedRegistry: RegistryEntity = await this._registryRepository.save(registryEntity);
        return { registry: savedRegistry };
    }

}
