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
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const jwt_auth_guard_1 = require("./../../auth/auth/jwt-auth.guard");
let SetGateway = class SetGateway {
    wsCreate(client, unitHydrant) {
        client.broadcast.emit('ws-server/create/set', unitHydrant);
        return undefined;
    }
    wsUpdate(client, unitHydrant) {
        client.broadcast.emit('ws-server/create/set', unitHydrant);
        return undefined;
    }
};
__decorate([
    websockets_1.SubscribeMessage('ws-client/create/set'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], SetGateway.prototype, "wsCreate", null);
__decorate([
    websockets_1.SubscribeMessage('ws-client/update/set'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], SetGateway.prototype, "wsUpdate", null);
SetGateway = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    websockets_1.WebSocketGateway()
], SetGateway);
exports.SetGateway = SetGateway;
//# sourceMappingURL=set.gateway.js.map