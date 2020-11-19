"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const session_exception_msg_1 = require("./session-exception.msg");
const class_transformer_1 = require("class-transformer");
const session_entity_1 = require("./session.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SessionService = class SessionService {
    constructor(_sessionRepository) {
        this._sessionRepository = _sessionRepository;
    }
    async findAll() {
        const qb = this._sessionRepository.createQueryBuilder('sessions');
        const sessions = await qb.getMany();
        const count = await qb.getCount();
        return { sessions: sessions, count };
    }
    async findAllByUserId(userId) {
        const qb = this._sessionRepository.createQueryBuilder('sessions')
            .leftJoinAndSelect('sessions.user', 'user')
            .where('user.id = :id', { id: userId });
        const sessions = await qb.getMany();
        const count = await qb.getCount();
        return { sessions: sessions, count };
    }
    async findOneById(id) {
        const foundSession = await this._sessionRepository.createQueryBuilder('sessions')
            .where('sessions.id = :id', { id })
            .getOne();
        return { session: foundSession };
    }
    async startSession(sessionCreateDto) {
        const sessionEntity = class_transformer_1.plainToClass(session_entity_1.SessionEntity, sessionCreateDto);
        const savedSession = await this._sessionRepository.save(sessionEntity);
        return { session: savedSession };
    }
    async finalizeSession(id) {
        const foundSession = await this._sessionRepository.createQueryBuilder('sessions')
            .where('sessions.id = :id', { id })
            .getOne();
        if (!foundSession) {
            throw new common_1.NotFoundException(session_exception_msg_1.SessionExceptionMSG.NOT_FOUND);
        }
        foundSession.active = 0;
        foundSession.finished = new Date();
        const updateResult = await this._sessionRepository.update(id, {
            active: 0,
            finished: new Date()
        });
        return updateResult.affected > 0;
    }
};
SessionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(session_entity_1.SessionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map