"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const action_controller_1 = require("./action/action.controller");
const action_entity_1 = require("./action/action.entity");
const action_service_1 = require("./action/action.service");
const order_controller_1 = require("./order/order.controller");
const order_entity_1 = require("./order/order.entity");
const order_service_1 = require("./order/order.service");
const registry_controller_1 = require("./registry/registry.controller");
const registry_entity_1 = require("./registry/registry.entity");
const registry_service_1 = require("./registry/registry.service");
const session_entity_1 = require("./session/session.entity");
const session_service_1 = require("./session/session.service");
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                session_entity_1.SessionEntity,
                action_entity_1.ActionEntity,
                order_entity_1.OrderEntity,
                registry_entity_1.RegistryEntity,
            ])
        ],
        controllers: [
            registry_controller_1.RegistryController,
            order_controller_1.OrderController,
            action_controller_1.ActionController
        ],
        providers: [
            registry_service_1.RegistryService,
            action_service_1.ActionService,
            order_service_1.OrderService,
            session_service_1.SessionService
        ]
    })
], SessionModule);
exports.SessionModule = SessionModule;
//# sourceMappingURL=session.module.js.map