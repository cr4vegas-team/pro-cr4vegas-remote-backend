import { ControlService } from './../control/control.service';
import { ControlEntity } from './../control/control.entity';
import { plainToClass } from 'class-transformer';
import { ManageCreateDto } from './manage-create.dto';
import { ManageEntity } from './manage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageRO, ManagesRO } from './manage.interfaces';

@Injectable()
export class ManageService {

    constructor(
        @InjectRepository(ManageEntity)
        private readonly _manageRepository: Repository<ManageEntity>,
        private readonly _controlService: ControlService,
    ) { }

    async findAll(): Promise<ManagesRO> {
        const qb = this._manageRepository.createQueryBuilder('manages');
        const manages: ManageEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { manages, count };
    }

    async findAllByControlId(controlId: number): Promise<ManagesRO> {
        const qb = this._manageRepository.createQueryBuilder('manages')
            .leftJoinAndSelect('manages.controls', 'controls')
            .where('controls.id = :controlId', { controlId });
        const manages: ManageEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { manages, count };
    }

    async insertOne(manageCreateDto: ManageCreateDto): Promise<ManageRO> {
        const manageEntity: ManageEntity = plainToClass(ManageEntity, manageCreateDto);
        const controlEntity: ControlEntity = (await this._controlService.findOneById(manageCreateDto.control)).control;
        manageEntity.control = controlEntity;
        const savedManage: ManageEntity = await this._manageRepository.save(manageEntity);
        return { manage: savedManage };
    }

}
