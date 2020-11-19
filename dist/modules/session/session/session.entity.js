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
exports.SessionEntity = void 0;
const openapi = require("@nestjs/swagger");
const registry_entity_1 = require("../registry/registry.entity");
const order_entity_1 = require("../order/order.entity");
const action_entity_1 = require("../action/action.entity");
const user_entity_1 = require("../../auth/user/user.entity");
const typeorm_1 = require("typeorm");
let SessionEntity = class SessionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user: { required: true, type: () => require("../../auth/user/user.entity").UserEntity }, action: { required: true, type: () => [require("../action/action.entity").ActionEntity] }, orders: { required: true, type: () => [require("../order/order.entity").OrderEntity] }, registries: { required: true, type: () => [require("../registry/registry.entity").RegistryEntity] }, active: { required: true, type: () => Number }, started: { required: true, type: () => Date }, finished: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], SessionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.sessions),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.UserEntity)
], SessionEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => action_entity_1.ActionEntity, actionEntity => actionEntity.session),
    __metadata("design:type", Array)
], SessionEntity.prototype, "action", void 0);
__decorate([
    typeorm_1.OneToMany(type => order_entity_1.OrderEntity, orderEntity => orderEntity.session),
    __metadata("design:type", Array)
], SessionEntity.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToMany(type => registry_entity_1.RegistryEntity, registryEntity => registryEntity.session),
    __metadata("design:type", Array)
], SessionEntity.prototype, "registries", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 1,
    }),
    __metadata("design:type", Number)
], SessionEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], SessionEntity.prototype, "started", void 0);
__decorate([
    typeorm_1.Column({
        type: 'timestamp',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Date)
], SessionEntity.prototype, "finished", void 0);
SessionEntity = __decorate([
    typeorm_1.Entity('sessions')
], SessionEntity);
exports.SessionEntity = SessionEntity;
//# sourceMappingURL=session.entity.js.map