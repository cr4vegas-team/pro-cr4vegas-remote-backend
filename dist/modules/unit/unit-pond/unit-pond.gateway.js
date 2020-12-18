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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitPondGateway = void 0;
const jwt_auth_guard_1 = require("./../../auth/auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const websockets_1 = require("@nestjs/websockets");
const typeorm_1 = require("typeorm");
let UnitPondGateway = class UnitPondGateway {
    constructor(_client) {
        this._client = _client;
        this._mqttClient = this._client.createClient();
    }
    handleMessage(client, payload) {
        const payloadJSON = JSON.parse(payload);
        this._mqttClient.publish(payloadJSON.topic, payloadJSON.message);
        return undefined;
    }
    emit(packet) {
        this._server.emit('ws-server/unit/pond', packet);
    }
    wsCreate(client, unitHydrant) {
        client.broadcast.emit('ws-server/create/unit/pond', unitHydrant);
        return undefined;
    }
    wsUpdate(client, unitHydrant) {
        client.broadcast.emit('ws-server/create/unit/pond', unitHydrant);
        return undefined;
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeorm_1.Server)
], UnitPondGateway.prototype, "_server", void 0);
__decorate([
    websockets_1.SubscribeMessage('ws-client/unit/pond'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], UnitPondGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('ws-client/create/unit/pond'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], UnitPondGateway.prototype, "wsCreate", null);
__decorate([
    websockets_1.SubscribeMessage('ws-client/update/unit/pond'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], UnitPondGateway.prototype, "wsUpdate", null);
UnitPondGateway = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    websockets_1.WebSocketGateway(),
    __param(0, common_1.Inject('MQTT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientMqtt])
], UnitPondGateway);
exports.UnitPondGateway = UnitPondGateway;
//# sourceMappingURL=unit-pond.gateway.js.map