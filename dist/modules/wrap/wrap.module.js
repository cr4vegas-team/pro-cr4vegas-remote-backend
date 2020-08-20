"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sector_controller_1 = require("./sector/sector.controller");
const sector_entity_1 = require("./sector/sector.entity");
const sector_service_1 = require("./sector/sector.service");
const set_controller_1 = require("./set/set.controller");
const set_entity_1 = require("./set/set.entity");
const set_service_1 = require("./set/set.service");
const station_controller_1 = require("./station/station.controller");
const station_entity_1 = require("./station/station.entity");
const station_service_1 = require("./station/station.service");
let WrapModule = class WrapModule {
};
WrapModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([station_entity_1.StationEntity, set_entity_1.SetEntity, sector_entity_1.SectorEntity]),
        ],
        controllers: [
            station_controller_1.StationController, sector_controller_1.SectorController, set_controller_1.SetController
        ],
        providers: [
            station_service_1.StationService,
            sector_service_1.SectorService,
            set_service_1.SetService,
        ],
        exports: [
            sector_service_1.SectorService,
            set_service_1.SetService,
            station_service_1.StationService,
        ]
    })
], WrapModule);
exports.WrapModule = WrapModule;
//# sourceMappingURL=wrap.module.js.map