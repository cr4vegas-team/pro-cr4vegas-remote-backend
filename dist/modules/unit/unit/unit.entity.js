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
exports.UnitEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const action_entity_1 = require("../../session/action/action.entity");
const sector_entity_1 = require("../../wrap/sector/sector.entity");
const set_entity_1 = require("../../wrap/set/set.entity");
const station_entity_1 = require("../../wrap/station/station.entity");
const unit_type_enum_1 = require("./unit-type.enum");
let UnitEntity = class UnitEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, station: { required: true, type: () => require("../../wrap/station/station.entity").StationEntity }, sector: { required: true, type: () => require("../../wrap/sector/sector.entity").SectorEntity }, sets: { required: true, type: () => [require("../../wrap/set/set.entity").SetEntity] }, actions: { required: true, type: () => [require("../../session/action/action.entity").ActionEntity] }, unitTypeTable: { required: true, enum: require("./unit-type.enum").UnitTypeTableEnum }, code: { required: true, type: () => Number }, altitude: { required: true, type: () => Number }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, description: { required: true, type: () => String }, active: { required: true, type: () => Number }, image: { required: true, type: () => String }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], UnitEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => station_entity_1.StationEntity, stationEntity => stationEntity.units),
    typeorm_1.JoinColumn(),
    __metadata("design:type", station_entity_1.StationEntity)
], UnitEntity.prototype, "station", void 0);
__decorate([
    typeorm_1.ManyToOne(type => sector_entity_1.SectorEntity, sectorEntity => sectorEntity.units),
    typeorm_1.JoinColumn(),
    __metadata("design:type", sector_entity_1.SectorEntity)
], UnitEntity.prototype, "sector", void 0);
__decorate([
    typeorm_1.ManyToMany(type => set_entity_1.SetEntity, setEntity => setEntity.units),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], UnitEntity.prototype, "sets", void 0);
__decorate([
    typeorm_1.OneToMany(type => action_entity_1.ActionEntity, actionEntity => actionEntity.unit),
    __metadata("design:type", Array)
], UnitEntity.prototype, "actions", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: unit_type_enum_1.UnitTypeTableEnum,
    }),
    __metadata("design:type", String)
], UnitEntity.prototype, "unitTypeTable", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UnitEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UnitEntity.prototype, "altitude", void 0);
__decorate([
    typeorm_1.Column({
        type: 'double',
    }),
    __metadata("design:type", Number)
], UnitEntity.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column({
        type: 'double',
    }),
    __metadata("design:type", Number)
], UnitEntity.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], UnitEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 1,
    }),
    __metadata("design:type", Number)
], UnitEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], UnitEntity.prototype, "image", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], UnitEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], UnitEntity.prototype, "updated", void 0);
UnitEntity = __decorate([
    typeorm_1.Entity('units')
], UnitEntity);
exports.UnitEntity = UnitEntity;
//# sourceMappingURL=unit.entity.js.map