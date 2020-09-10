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
exports.SectorEntity = void 0;
const unit_entity_1 = require("../../unit/unit/unit.entity");
const typeorm_1 = require("typeorm");
let SectorEntity = class SectorEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], SectorEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => unit_entity_1.UnitEntity, unitEntity => unitEntity.sector),
    __metadata("design:type", Array)
], SectorEntity.prototype, "units", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 15,
        unique: true
    }),
    __metadata("design:type", String)
], SectorEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 45,
        unique: true
    }),
    __metadata("design:type", String)
], SectorEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
    }),
    __metadata("design:type", String)
], SectorEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SectorEntity.prototype, "updated", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SectorEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 1
    }),
    __metadata("design:type", Number)
], SectorEntity.prototype, "active", void 0);
SectorEntity = __decorate([
    typeorm_1.Entity('sectors')
], SectorEntity);
exports.SectorEntity = SectorEntity;
//# sourceMappingURL=sector.entity.js.map