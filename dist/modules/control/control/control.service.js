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
exports.ControlService = void 0;
const control_exception_msg_1 = require("./control-exception.msg");
const class_transformer_1 = require("class-transformer");
const control_entity_1 = require("./control.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ControlService = class ControlService {
    constructor(_controlRepository) {
        this._controlRepository = _controlRepository;
    }
    async findAll() {
        const qb = this._controlRepository.createQueryBuilder('controls');
        const controls = await qb.getMany();
        const count = await qb.getCount();
        return { controls, count };
    }
    async findAllByUserId(userId) {
        const qb = this._controlRepository.createQueryBuilder('controls')
            .leftJoinAndSelect('controls.user', 'user')
            .where('user.id = :id', { id: userId });
        const controls = await qb.getMany();
        const count = await qb.getCount();
        return { controls, count };
    }
    async findOneById(id) {
        const foundControl = await this._controlRepository.createQueryBuilder('controls')
            .where('controls.id = :id', { id })
            .getOne();
        return { control: foundControl };
    }
    async insertOne(controlCreateDto) {
        const controlEntity = class_transformer_1.plainToClass(control_entity_1.ControlEntity, controlCreateDto);
        const savedControl = await this._controlRepository.save(controlEntity);
        return { control: savedControl };
    }
    async finalizeControl(id) {
        const foundControl = await this._controlRepository.createQueryBuilder('controls')
            .where('controls.id = :id', { id })
            .getOne();
        if (!foundControl) {
            throw new common_1.NotFoundException(control_exception_msg_1.ControlExceptionMSG.NOT_FOUND);
        }
        foundControl.active = 0;
        foundControl.finished = new Date();
        const updateResult = await this._controlRepository.update(id, {
            active: 0,
            finished: new Date()
        });
        return updateResult.affected > 0;
    }
};
ControlService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(control_entity_1.ControlEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ControlService);
exports.ControlService = ControlService;
//# sourceMappingURL=control.service.js.map