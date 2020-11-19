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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionEntity = void 0;
const openapi = require("@nestjs/swagger");
const unit_entity_1 = require("../../unit/unit/unit.entity");
const session_entity_1 = require("../session/session.entity");
const typeorm_1 = require("typeorm");
let ActionEntity = class ActionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, session: { required: true, type: () => require("../session/session.entity").SessionEntity }, unit: { required: true, type: () => require("../../unit/unit/unit.entity").UnitEntity }, created: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], ActionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => session_entity_1.SessionEntity, controlEntity => controlEntity.action),
    typeorm_1.JoinColumn(),
    __metadata("design:type", session_entity_1.SessionEntity)
], ActionEntity.prototype, "session", void 0);
__decorate([
    typeorm_1.ManyToOne(type => unit_entity_1.UnitEntity, unitEntity => unitEntity.actions),
    typeorm_1.JoinColumn(),
    __metadata("design:type", unit_entity_1.UnitEntity)
], ActionEntity.prototype, "unit", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], ActionEntity.prototype, "created", void 0);
ActionEntity = __decorate([
    typeorm_1.Entity('actions')
], ActionEntity);
exports.ActionEntity = ActionEntity;
//# sourceMappingURL=action.entity.js.map