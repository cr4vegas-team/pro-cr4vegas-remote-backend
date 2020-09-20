import { ControlExceptionMSG } from './control-exception.msg';
import { plainToClass } from 'class-transformer';
import { ControlCreateDto } from './dto/control-create.dto';
import { ControlEntity } from './control.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ControlRO, ControlsRO } from './control.interfaces';

@Injectable()
export class ControlService {

    constructor(
        @InjectRepository(ControlEntity)
        private readonly _controlRepository: Repository<ControlEntity>
    ) { }

    async findAll(): Promise<ControlsRO> {
        const qb = this._controlRepository.createQueryBuilder('controls');
        const controls: ControlEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { controls, count };
    }

    async findAllByUserId(userId: number): Promise<ControlsRO> {
        const qb = this._controlRepository.createQueryBuilder('controls')
            .leftJoinAndSelect('controls.user', 'user')
            .where('user.id = :id', { id: userId });
        const controls: ControlEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { controls, count };
    }

    async findOneById(id: number): Promise<ControlRO> {
        const foundControl: ControlEntity = await this._controlRepository.createQueryBuilder('controls')
            .where('controls.id = :id', { id })
            .getOne();
        return { control: foundControl };
    }

    async insertOne(controlCreateDto: ControlCreateDto): Promise<ControlRO> {
        const controlEntity: ControlEntity = plainToClass(ControlEntity, controlCreateDto);
        const savedControl: ControlEntity = await this._controlRepository.save(controlEntity);
        return { control: savedControl };
    }

    async finalizeControl(id: number): Promise<boolean> {
        const foundControl: ControlEntity = await this._controlRepository.createQueryBuilder('controls')
            .where('controls.id = :id', { id })
            .getOne();
        if (!foundControl) {
            throw new NotFoundException(ControlExceptionMSG.NOT_FOUND);
        }
        foundControl.active = 0;
        foundControl.finished = new Date();
        const updateResult: UpdateResult = await this._controlRepository.update(id, {
            active: 0,
            finished: new Date()
        });
        return updateResult.affected > 0;
    }

}
