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
exports.SetEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("../../unit/unit/unit.entity");
const set_type_entity_1 = require("./set-type.entity");
let SetEntity = class SetEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, setType: { required: true, type: () => require("./set-type.entity").SetTypeEntity }, units: { required: true, type: () => [require("../../unit/unit/unit.entity").UnitEntity] }, code: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, updated: { required: true, type: () => Date }, created: { required: true, type: () => Date }, active: { required: true, type: () => Number }, image: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], SetEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => set_type_entity_1.SetTypeEntity, type => type.name),
    typeorm_1.JoinColumn(),
    __metadata("design:type", set_type_entity_1.SetTypeEntity)
], SetEntity.prototype, "setType", void 0);
__decorate([
    typeorm_1.ManyToMany(type => unit_entity_1.UnitEntity, unitEntity => unitEntity.sets),
    __metadata("design:type", Array)
], SetEntity.prototype, "units", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 5,
        unique: true,
    }),
    __metadata("design:type", String)
], SetEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 45,
        unique: true,
    }),
    __metadata("design:type", String)
], SetEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], SetEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SetEntity.prototype, "updated", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SetEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        default: 1,
    }),
    __metadata("design:type", Number)
], SetEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], SetEntity.prototype, "image", void 0);
SetEntity = __decorate([
    typeorm_1.Entity('sets')
], SetEntity);
exports.SetEntity = SetEntity;
//# sourceMappingURL=set.entity.js.map