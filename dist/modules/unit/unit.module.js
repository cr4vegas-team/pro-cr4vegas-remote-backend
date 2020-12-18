"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitModule = void 0;
const shared_module_1 = require("./../shared/shared.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wrap_module_1 = require("../wrap/wrap.module");
const app_module_1 = require("./../../app.module");
const unit_generic_controller_1 = require("./unit-generic/unit-generic.controller");
const unit_generic_entity_1 = require("./unit-generic/unit-generic.entity");
const unit_generic_service_1 = require("./unit-generic/unit-generic.service");
const unit_hydrant_controller_1 = require("./unit-hydrant/unit-hydrant.controller");
const unit_hydrant_entity_1 = require("./unit-hydrant/unit-hydrant.entity");
const unit_hydrant_service_1 = require("./unit-hydrant/unit-hydrant.service");
const unit_pond_controller_1 = require("./unit-pond/unit-pond.controller");
const unit_pond_entity_1 = require("./unit-pond/unit-pond.entity");
const unit_pond_service_1 = require("./unit-pond/unit-pond.service");
const unit_controller_1 = require("./unit/unit.controller");
const unit_entity_1 = require("./unit/unit.entity");
const unit_service_1 = require("./unit/unit.service");
const unit_hydrant_gateway_1 = require("./unit-hydrant/unit-hydrant.gateway");
const unit_pond_gateway_1 = require("./unit-pond/unit-pond.gateway");
const unit_generic_gateway_1 = require("./unit-generic/unit-generic.gateway");
let UnitModule = class UnitModule {
};
UnitModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                unit_entity_1.UnitEntity,
                unit_hydrant_entity_1.UnitHydrantEntity,
                unit_pond_entity_1.UnitPondEntity,
                unit_generic_entity_1.UnitGenericEntity,
            ]),
            common_1.forwardRef(() => wrap_module_1.WrapModule),
            common_1.forwardRef(() => app_module_1.AppModule),
            shared_module_1.SharedModule,
        ],
        controllers: [
            unit_hydrant_controller_1.UnitHydrantController,
            unit_pond_controller_1.UnitPondController,
            unit_controller_1.UnitController,
            unit_generic_controller_1.UnitGenericController,
        ],
        providers: [
            unit_service_1.UnitService,
            unit_hydrant_service_1.UnitHydrantService,
            unit_pond_service_1.UnitPondService,
            unit_generic_service_1.UnitGenericService,
            unit_hydrant_gateway_1.UnitHydrantGateway,
            unit_generic_gateway_1.UnitGenericGateway,
            unit_pond_gateway_1.UnitPondGateway,
        ],
        exports: [
            unit_service_1.UnitService,
            unit_hydrant_service_1.UnitHydrantService,
            unit_pond_service_1.UnitPondService,
            unit_generic_service_1.UnitGenericService,
        ],
    })
], UnitModule);
exports.UnitModule = UnitModule;
//# sourceMappingURL=unit.module.js.map