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
exports.SetGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const ws_1 = require("ws");
let SetGateway = class SetGateway {
    wsCreate(client, data) {
        this._server.clients.forEach(serverClient => {
            serverClient.send(JSON.stringify({ event: 'ws-server/create/set', dto: data }));
        });
        return undefined;
    }
    wsUpdate(client, data) {
        this._server.clients.forEach(serverClient => {
            serverClient.send(JSON.stringify({ event: 'ws-server/update/set', data }));
        });
        return undefined;
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", ws_1.Server)
], SetGateway.prototype, "_server", void 0);
__decorate([
    websockets_1.SubscribeMessage('ws-client/create/set'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], SetGateway.prototype, "wsCreate", null);
__decorate([
    websockets_1.SubscribeMessage('ws-client/update/set'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], SetGateway.prototype, "wsUpdate", null);
SetGateway = __decorate([
    websockets_1.WebSocketGateway(8882)
], SetGateway);
exports.SetGateway = SetGateway;
//# sourceMappingURL=set.gateway.js.map