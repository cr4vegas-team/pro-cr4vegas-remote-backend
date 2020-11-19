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
exports.ActionService = void 0;
const session_service_1 = require("../session/session.service");
const class_transformer_1 = require("class-transformer");
const action_entity_1 = require("./action.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ActionService = class ActionService {
    constructor(_manageRepository, _sessionService) {
        this._manageRepository = _manageRepository;
        this._sessionService = _sessionService;
    }
    async findAll() {
        const qb = this._manageRepository.createQueryBuilder('actions');
        const manages = await qb.getMany();
        const count = await qb.getCount();
        return { actions: manages, count };
    }
    async findAllBySessionId(sessionId) {
        const qb = this._manageRepository.createQueryBuilder('actions')
            .leftJoinAndSelect('actions.sessions', 'sessions')
            .where('sessions.id = :sessionId', { sessionId });
        const manages = await qb.getMany();
        const count = await qb.getCount();
        return { actions: manages, count };
    }
    async insertOne(manageCreateDto) {
        const manageEntity = class_transformer_1.plainToClass(action_entity_1.ActionEntity, manageCreateDto);
        const sessionEntity = (await this._sessionService.findOneById(manageCreateDto.session)).session;
        manageEntity.session = sessionEntity;
        const savedManage = await this._manageRepository.save(manageEntity);
        return { action: savedManage };
    }
};
ActionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(action_entity_1.ActionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        session_service_1.SessionService])
], ActionService);
exports.ActionService = ActionService;
//# sourceMappingURL=action.service.js.map