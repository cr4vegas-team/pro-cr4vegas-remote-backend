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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_exception_msg_1 = require("./user-exception.msg");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async findAll() {
        const qb = await this._userRepository.createQueryBuilder('users')
            .orderBy('users.created', 'DESC');
        const foundUsers = await qb.getMany();
        const count = await qb.getCount();
        const users = foundUsers.map(user => this.buildUserData(user));
        return { users, count };
    }
    async findOneById(id) {
        const qb = await this._userRepository.createQueryBuilder('users')
            .where('users.id = :id', { id });
        const foundUser = await qb.getOne();
        const user = this.buildUserData(foundUser);
        return { user };
    }
    async findOneToValidation(query) {
        if ('username' in query) {
            const qb = await this._userRepository.createQueryBuilder('users');
            qb.where('users.username = :username', { username: `${query.username}` });
            qb.orWhere('users.email = :email', { email: `${query.username}` });
            return qb.getOne();
        }
        return null;
    }
    async createOne(dto) {
        const foundUsername = await this._userRepository.createQueryBuilder('users')
            .where('users.username = :username', { username: dto.username })
            .getOne();
        if (foundUsername) {
            throw new common_1.ConflictException(user_exception_msg_1.UserExceptionMSG.CONFLICT_USERNAME);
        }
        const foundEmail = await this._userRepository.createQueryBuilder('users')
            .where('users.email = :email', { email: dto.email })
            .getOne();
        if (foundEmail) {
            throw new common_1.ConflictException(user_exception_msg_1.UserExceptionMSG.CONFLICT_EMAIL);
        }
        const newUser = new user_entity_1.UserEntity();
        newUser.username = dto.username;
        newUser.password = dto.password;
        newUser.email = dto.email;
        const savedUser = await this._userRepository.save(newUser);
        const user = this.buildUserData(savedUser);
        return { user };
    }
    async updateOne(dto) {
        const foundUser = await this._userRepository.createQueryBuilder('users')
            .where('users.id = :id', { id: dto.id })
            .getOne();
        if (!foundUser) {
            throw new common_1.NotFoundException(user_exception_msg_1.UserExceptionMSG.NOT_FOUND);
        }
        foundUser.username = dto.username ? dto.username : foundUser.username;
        foundUser.password = dto.password ? dto.password : foundUser.password;
        foundUser.email = dto.email ? dto.email : foundUser.email;
        const updatedUser = await this._userRepository.save(foundUser);
        const user = this.buildUserData(updatedUser);
        return { user };
    }
    async deleteOne(id) {
        const foundUser = await this._userRepository.createQueryBuilder('users')
            .where('users.id = :id', { id })
            .getOne();
        if (!foundUser) {
            throw new common_1.NotFoundException(user_exception_msg_1.UserExceptionMSG.NOT_FOUND);
        }
        const updateUser = await this._userRepository.update(id, { active: false });
        return updateUser.affected > 0;
    }
    async activateOne(id) {
        const foundUser = await this._userRepository.createQueryBuilder('users')
            .where('users.id = :id', { id })
            .getOne();
        if (!foundUser) {
            throw new common_1.NotFoundException(user_exception_msg_1.UserExceptionMSG.NOT_FOUND);
        }
        const updateUser = await this._userRepository.update(id, { active: true });
        return updateUser.affected > 0;
    }
    buildUserData(userEntity) {
        return {
            id: userEntity.id,
            username: userEntity.username,
            email: userEntity.email,
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map