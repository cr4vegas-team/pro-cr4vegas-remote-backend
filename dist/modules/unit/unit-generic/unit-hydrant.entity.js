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
exports.UnitHydrantEntity = void 0;
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("../unit/unit.entity");
let UnitHydrantEntity = class UnitHydrantEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UnitHydrantEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => unit_entity_1.UnitEntity, { eager: true, cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", unit_entity_1.UnitEntity)
], UnitHydrantEntity.prototype, "unit", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], UnitHydrantEntity.prototype, "diameter", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 0,
    }),
    __metadata("design:type", Number)
], UnitHydrantEntity.prototype, "filter", void 0);
UnitHydrantEntity = __decorate([
    typeorm_1.Entity('units_hydrants')
], UnitHydrantEntity);
exports.UnitHydrantEntity = UnitHydrantEntity;
//# sourceMappingURL=unit-hydrant.entity.js.map