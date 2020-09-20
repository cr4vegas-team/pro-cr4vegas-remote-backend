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
exports.ControlEntity = void 0;
const registry_entity_1 = require("./../registry/registry.entity");
const order_entity_1 = require("./../order/order.entity");
const manage_entity_1 = require("./../manage/manage.entity");
const user_entity_1 = require("./../../auth/user/user.entity");
const typeorm_1 = require("typeorm");
let ControlEntity = class ControlEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], ControlEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.controls),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.UserEntity)
], ControlEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => manage_entity_1.ManageEntity, manageEntity => manageEntity.control),
    __metadata("design:type", Array)
], ControlEntity.prototype, "manages", void 0);
__decorate([
    typeorm_1.OneToMany(type => order_entity_1.OrderEntity, orderEntity => orderEntity.control),
    __metadata("design:type", Array)
], ControlEntity.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToMany(type => registry_entity_1.RegistryEntity, registryEntity => registryEntity.control),
    __metadata("design:type", Array)
], ControlEntity.prototype, "registries", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 1
    }),
    __metadata("design:type", Number)
], ControlEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], ControlEntity.prototype, "started", void 0);
__decorate([
    typeorm_1.Column({
        type: 'timestamp',
        nullable: true,
        default: null
    }),
    __metadata("design:type", Date)
], ControlEntity.prototype, "finished", void 0);
ControlEntity = __decorate([
    typeorm_1.Entity('controls')
], ControlEntity);
exports.ControlEntity = ControlEntity;
//# sourceMappingURL=control.entity.js.map