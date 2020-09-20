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
exports.RegistryEntity = void 0;
const control_entity_1 = require("./../control/control.entity");
const typeorm_1 = require("typeorm");
let RegistryEntity = class RegistryEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], RegistryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => control_entity_1.ControlEntity, controlEntity => controlEntity.registries),
    __metadata("design:type", control_entity_1.ControlEntity)
], RegistryEntity.prototype, "control", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], RegistryEntity.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 1,
    }),
    __metadata("design:type", Number)
], RegistryEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'varchar'
    }),
    __metadata("design:type", Date)
], RegistryEntity.prototype, "created", void 0);
RegistryEntity = __decorate([
    typeorm_1.Entity('registries')
], RegistryEntity);
exports.RegistryEntity = RegistryEntity;
//# sourceMappingURL=registry.entity.js.map