import { SessionExceptionMSG } from './session-exception.msg';
import { plainToClass } from 'class-transformer';
import { SessionCreateDto } from './dto/session-create.dto';
import { SessionEntity } from './session.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SessionRO, SessionsRO } from './dto/session-response.dto';

@Injectable()
export class SessionService {

    constructor(
        @InjectRepository(SessionEntity)
        private readonly _sessionRepository: Repository<SessionEntity>
    ) { }

    async findAll(): Promise<SessionsRO> {
        const qb = this._sessionRepository.createQueryBuilder('sessions');
        const sessions: SessionEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { sessions: sessions, count };
    }

    async findAllByUserId(userId: number): Promise<SessionsRO> {
        const qb = this._sessionRepository.createQueryBuilder('sessions')
            .leftJoinAndSelect('sessions.user', 'user')
            .where('user.id = :id', { id: userId });
        const sessions: SessionEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { sessions: sessions, count };
    }

    async findOneById(id: number): Promise<SessionRO> {
        const foundSession: SessionEntity = await this._sessionRepository.createQueryBuilder('sessions')
            .where('sessions.id = :id', { id })
            .getOne();
        return { session: foundSession };
    }

    async startSession(sessionCreateDto: SessionCreateDto): Promise<SessionRO> {
        const sessionEntity: SessionEntity = plainToClass(SessionEntity, sessionCreateDto);
        const savedSession: SessionEntity = await this._sessionRepository.save(sessionEntity);
        return { session: savedSession };
    }

    async finalizeSession(id: number): Promise<boolean> {
        const foundSession: SessionEntity = await this._sessionRepository.createQueryBuilder('sessions')
            .where('sessions.id = :id', { id })
            .getOne();
        if (!foundSession) {
            throw new NotFoundException(SessionExceptionMSG.NOT_FOUND);
        }
        foundSession.active = 0;
        foundSession.finished = new Date();
        const updateResult: UpdateResult = await this._sessionRepository.update(id, {
            active: 0,
            finished: new Date()
        });
        return updateResult.affected > 0;
    }

}
