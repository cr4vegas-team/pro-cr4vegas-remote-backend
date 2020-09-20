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
exports.OrderEntity = void 0;
const control_entity_1 = require("./../control/control.entity");
const typeorm_1 = require("typeorm");
let OrderEntity = class OrderEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], OrderEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => control_entity_1.ControlEntity, controlEntity => controlEntity.orders),
    typeorm_1.JoinColumn(),
    __metadata("design:type", control_entity_1.ControlEntity)
], OrderEntity.prototype, "control", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 1
    }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updated", void 0);
OrderEntity = __decorate([
    typeorm_1.Entity('orders')
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map