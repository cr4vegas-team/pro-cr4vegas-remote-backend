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
exports.StationEntity = void 0;
const unit_entity_1 = require("../../unit/unit/unit.entity");
const typeorm_1 = require("typeorm");
let StationEntity = class StationEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], StationEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => unit_entity_1.UnitEntity, unitEntity => unitEntity.station),
    __metadata("design:type", Array)
], StationEntity.prototype, "units", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 15,
        unique: true,
        nullable: false
    }),
    __metadata("design:type", String)
], StationEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 45,
        unique: true,
        nullable: false
    }),
    __metadata("design:type", String)
], StationEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        default: 0,
    }),
    __metadata("design:type", Number)
], StationEntity.prototype, "altitude", void 0);
__decorate([
    typeorm_1.Column({
        type: 'double',
        default: 0,
    }),
    __metadata("design:type", Number)
], StationEntity.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column({
        type: 'double',
        default: 0,
    }),
    __metadata("design:type", Number)
], StationEntity.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
    }),
    __metadata("design:type", String)
], StationEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], StationEntity.prototype, "updated", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], StationEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column({
        type: 'boolean',
        default: true
    }),
    __metadata("design:type", Boolean)
], StationEntity.prototype, "active", void 0);
StationEntity = __decorate([
    typeorm_1.Entity('stations')
], StationEntity);
exports.StationEntity = StationEntity;
//# sourceMappingURL=station.entity.js.map