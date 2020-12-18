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
exports.WsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
let WsGateway = class WsGateway {
    constructor() {
        this._users = 0;
    }
    get server() {
        return this._server;
    }
    async afterInit(server) {
        this._server = server;
        setInterval(() => {
            this._server.emit('test', 'UnitHydrantController inicializado!!!');
        }, 2000);
        this._server.on('test', data => {
            console.log(data);
        });
    }
    handleConnection(client, ...args) {
        this._users++;
        this._server.emit('users', this._users);
    }
    handleDisconnect(client) {
        this._users--;
        this._server.emit('users', this._users);
    }
    handleEvent(data) {
        console.log(data);
        return data;
    }
};
__decorate([
    websockets_1.SubscribeMessage('test'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], WsGateway.prototype, "handleEvent", null);
WsGateway = __decorate([
    websockets_1.WebSocketGateway()
], WsGateway);
exports.WsGateway = WsGateway;
//# sourceMappingURL=ws.gateway.js.map