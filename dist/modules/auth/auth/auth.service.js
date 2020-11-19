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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
const user_response_dto_1 = require("./../user/dto/user-response.dto");
let AuthService = class AuthService {
    constructor(_userService, _jwtService) {
        this._userService = _userService;
        this._jwtService = _jwtService;
    }
    async validateUser(username, password) {
        const foundUser = await this._userService.findOneToValidation(username);
        if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
            const userDto = new user_response_dto_1.UserDto();
            userDto.id = foundUser.id;
            userDto.username = foundUser.username;
            userDto.email = foundUser.email;
            userDto.role = foundUser.role;
            return userDto;
        }
        else {
            return null;
        }
    }
    async getToken(userDto) {
        const payload = {
            id: userDto.id,
            username: userDto.username,
            email: userDto.email,
            role: userDto.role,
        };
        return {
            access_token: this._jwtService.sign(payload),
            role: userDto.role,
        };
    }
    async signin(dto) {
        return this._userService.createOne(dto);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map