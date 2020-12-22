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
exports.StationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const ws_1 = require("ws");
let StationGateway = class StationGateway {
    wsCreate(client, dto) {
        this._server.clients.forEach(serverClient => {
            serverClient.send(JSON.stringify({ event: 'ws-server/update/station', dto }));
        });
        return undefined;
    }
    wsUpdate(client, dto) {
        this._server.clients.forEach(serverClient => {
            serverClient.send(JSON.stringify({ event: 'ws-server/update/station', dto }));
        });
        return undefined;
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", ws_1.Server)
], StationGateway.prototype, "_server", void 0);
__decorate([
    websockets_1.SubscribeMessage('ws-client/create/station'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], StationGateway.prototype, "wsCreate", null);
__decorate([
    websockets_1.SubscribeMessage('ws-client/update/station'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], StationGateway.prototype, "wsUpdate", null);
StationGateway = __decorate([
    websockets_1.WebSocketGateway(8882)
], StationGateway);
exports.StationGateway = StationGateway;
//# sourceMappingURL=station.gateway.js.map