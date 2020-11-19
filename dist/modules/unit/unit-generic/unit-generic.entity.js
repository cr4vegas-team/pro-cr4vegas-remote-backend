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
exports.UnitGenericEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const unit_entity_1 = require("../unit/unit.entity");
let UnitGenericEntity = class UnitGenericEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, unit: { required: true, type: () => require("../unit/unit.entity").UnitEntity }, data1: { required: true, type: () => String }, data2: { required: true, type: () => String }, data3: { required: true, type: () => String }, data4: { required: true, type: () => String }, data5: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UnitGenericEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => unit_entity_1.UnitEntity),
    typeorm_1.JoinColumn(),
    __metadata("design:type", unit_entity_1.UnitEntity)
], UnitGenericEntity.prototype, "unit", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], UnitGenericEntity.prototype, "data1", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], UnitGenericEntity.prototype, "data2", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], UnitGenericEntity.prototype, "data3", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], UnitGenericEntity.prototype, "data4", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], UnitGenericEntity.prototype, "data5", void 0);
UnitGenericEntity = __decorate([
    typeorm_1.Entity('units_generics')
], UnitGenericEntity);
exports.UnitGenericEntity = UnitGenericEntity;
//# sourceMappingURL=unit-generic.entity.js.map