"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlModule = void 0;
const registry_entity_1 = require("./registry/registry.entity");
const order_entity_1 = require("./order/order.entity");
const manage_entity_1 = require("./manage/manage.entity");
const control_entity_1 = require("./control/control.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const registry_controller_1 = require("./registry/registry.controller");
const registry_service_1 = require("./registry/registry.service");
const manage_controller_1 = require("./manage/manage.controller");
const manage_service_1 = require("./manage/manage.service");
const order_controller_1 = require("./order/order.controller");
const order_service_1 = require("./order/order.service");
const control_controller_1 = require("./control/control.controller");
const control_service_1 = require("./control/control.service");
let ControlModule = class ControlModule {
};
ControlModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                control_entity_1.ControlEntity,
                manage_entity_1.ManageEntity,
                order_entity_1.OrderEntity,
                registry_entity_1.RegistryEntity,
            ])
        ],
        controllers: [
            registry_controller_1.RegistryController,
            manage_controller_1.ManageController,
            order_controller_1.OrderController,
            control_controller_1.ControlController
        ],
        providers: [
            registry_service_1.RegistryService,
            manage_service_1.ManageService,
            order_service_1.OrderService,
            control_service_1.ControlService
        ]
    })
], ControlModule);
exports.ControlModule = ControlModule;
//# sourceMappingURL=control.module.js.map