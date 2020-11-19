import { SessionService } from '../session/session.service';
import { SessionEntity } from '../session/session.entity';
import { plainToClass } from 'class-transformer';
import { ActionCreateDto } from './dto/action-create.dto';
import { ActionEntity } from './action.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionRO, ActionsRO } from './dto/action-response.dto';

@Injectable()
export class ActionService {

    constructor(
        @InjectRepository(ActionEntity)
        private readonly _manageRepository: Repository<ActionEntity>,
        private readonly _sessionService: SessionService,
    ) { }

    async findAll(): Promise<ActionsRO> {
        const qb = this._manageRepository.createQueryBuilder('actions');
        const manages: ActionEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { actions: manages, count };
    }

    async findAllBySessionId(sessionId: number): Promise<ActionsRO> {
        const qb = this._manageRepository.createQueryBuilder('actions')
            .leftJoinAndSelect('actions.sessions', 'sessions')
            .where('sessions.id = :sessionId', { sessionId });
        const manages: ActionEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { actions: manages, count };
    }

    async insertOne(manageCreateDto: ActionCreateDto): Promise<ActionRO> {
        const manageEntity: ActionEntity = plainToClass(ActionEntity, manageCreateDto);
        const sessionEntity: SessionEntity = (await this._sessionService.findOneById(manageCreateDto.session)).session;
        manageEntity.session = sessionEntity;
        const savedManage: ActionEntity = await this._manageRepository.save(manageEntity);
        return { action: savedManage };
    }

}
