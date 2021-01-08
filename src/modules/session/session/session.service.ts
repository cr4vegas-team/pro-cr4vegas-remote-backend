/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserLoginDto } from './../../auth/user/dto/user-login.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './../../auth/user/user.entity';
import { SessionRO, SessionsRO } from './dto/session-response.dto';
import { SessionExceptionMSG } from './session-exception.msg';
import { SessionEntity } from './session.entity';

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

    async startSession(req: any): Promise<SessionRO> {
        const sessionEntity = new SessionEntity();
        sessionEntity.user = req.user;
        sessionEntity.userAgent = req.headers['user-agent'];
        sessionEntity.origin = req.headers['origin'];
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
