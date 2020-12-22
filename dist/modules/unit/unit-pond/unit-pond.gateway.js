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
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const ws_1 = require("ws");
let UnitPondGateway = class UnitPondGateway {
    constructor(_client) {
        this._client = _client;
        this._mqttClient = this._client.createClient();
    }
    handleMessage(client, data) {
        const payloadJSON = JSON.parse(data);
        this._mqttClient.publish(payloadJSON.topic, payloadJSON.message);
        return undefined;
    }
    emit(data) {
        this._server.clients.forEach(serverClient => {
            serverClient.send(JSON.stringify({ event: 'ws-server/unit/hydrant', data }));
        });
    }
    wsCreate(client, data) {
        this._server.clients.forEach(serverClient => {
            serverClient.send(JSON.stringify({ event: 'ws-server/create/unit/pond', data }));
        });
        return undefined;
    }
    wsUpdate(client, data) {
        this._server.clients.forEach(serverClient => {
            serverClient.send(JSON.stringify({ event: 'ws-server/update/unit/pond', data }));
        });
        return undefined;
    }
};
__decorate([
    decorators_1.WebSocketServer(),
    __metadata("design:type", ws_1.Server)
], UnitPondGateway.prototype, "_server", void 0);
__decorate([
    websockets_1.SubscribeMessage('ws-client/unit/pond'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], UnitPondGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('ws-client/create/unit/pond'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], UnitPondGateway.prototype, "wsCreate", null);
__decorate([
    websockets_1.SubscribeMessage('ws-client/update/unit/pond'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], UnitPondGateway.prototype, "wsUpdate", null);
UnitPondGateway = __decorate([
    websockets_1.WebSocketGateway(8882),
    __param(0, common_1.Inject('MQTT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientMqtt])
], UnitPondGateway);
exports.UnitPondGateway = UnitPondGateway;
//# sourceMappingURL=unit-pond.gateway.js.map