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
exports.UnitPondEntity = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("../unit/unit.entity");
let UnitPondEntity = class UnitPondEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UnitPondEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => unit_entity_1.UnitEntity, { eager: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", unit_entity_1.UnitEntity)
], UnitPondEntity.prototype, "unit", void 0);
__decorate([
    typeorm_1.Column({
        type: 'bigint',
        default: 0
    }),
    __metadata("design:type", Number)
], UnitPondEntity.prototype, "m3", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        default: 0.0
    }),
    __metadata("design:type", Number)
], UnitPondEntity.prototype, "height", void 0);
UnitPondEntity = __decorate([
    typeorm_1.Entity('units_ponds')
], UnitPondEntity);
exports.UnitPondEntity = UnitPondEntity;
//# sourceMappingURL=unit-pond.entity.js.map