import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AuthLoginDto } from '../auth/auth-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserExceptionMSG } from './user-exception.msg';
import { UserEntity } from './user.entity';
import { UserData, UserRO, UsersRO } from './user.interfaces';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>
    ) { }

    async findAll(query): Promise<UsersRO> {
        const qb = await this._userRepository.createQueryBuilder('users');
        qb.where("1 = 1");
        const usersCount: number = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("users.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("users.id > :id", { id: `${query.id}` });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        qb.orderBy("users.created", "DESC");
        const foundUsers: UserEntity[] = await qb.getMany();
        const users: UserData[] = foundUsers.map(user => this.buildUserData(user));
        return { users, count: usersCount };
    }

    async findOne(query): Promise<UserRO> {
        const qb = await this._userRepository.createQueryBuilder('users');
        qb.where("1 = 1");
        if ('active' in query) {
            qb.andWhere("users.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("users.id = :id", { id: `${query.id}` });
        }
        if ('username' in query) {
            qb.andWhere("users.username = :username", { id: `${query.username}` });
        }
        if ('email' in query) {
            qb.andWhere("users.email = :email", { id: `${query.email}` });
        }
        const foundUser: UserEntity = await qb.getOne();
        const user: UserData = this.buildUserData(foundUser);
        return { user };
    }

    async findOneToValidation(query): Promise<UserEntity> {
        if ('username' in query) {
            const qb = await this._userRepository.createQueryBuilder('users');
            qb.where('users.username = :username', { username: `${query.username}` });
            qb.orWhere('users.email = :email', { email: `${query.username}` });
            return qb.getOne();
        }
        return null;
    }

    async createOne(dto: CreateUserDto): Promise<UserRO> {
        const foundUsername: UserEntity = await this._userRepository.createQueryBuilder('users')
            .where('users.username = :username', {username: dto.username})
            .getOne();
        if(foundUsername) {
            throw new ConflictException(UserExceptionMSG.CONFLICT_USERNAME);
        }
        const foundEmail: UserEntity = await this._userRepository.createQueryBuilder('users')
            .where('users.email = :email', {email: dto.email})
            .getOne();
        if(foundEmail) {
            throw new ConflictException(UserExceptionMSG.CONFLICT_EMAIL);
        }
        const newUser: UserEntity = new UserEntity();
        newUser.username = dto.username;
        newUser.password = dto.password;
        newUser.email = dto.email;
        const savedUser: UserEntity = await this._userRepository.save(newUser);
        const user: UserData = this.buildUserData(savedUser);
        return { user };
    }

    async updateOne(id: number, dto: UpdateUserDto): Promise<UserRO> {
        const foundUser: UserEntity = await this._userRepository.findOne(id);
        if (!foundUser) {
            throw new NotFoundException(UserExceptionMSG.NOT_FOUND);
        }
        foundUser.username = dto.username ? dto.username : foundUser.username;
        foundUser.password = dto.password ? dto.password : foundUser.password;
        foundUser.email = dto.email ? dto.email : foundUser.email;
        const updatedUser: UserEntity = await this._userRepository.save(foundUser);
        const user = this.buildUserData(updatedUser);
        return { user };
    }

    async deleteOne(id: number): Promise<boolean> {
        const foundUser: UserEntity = await this._userRepository.findOne(id);
        if (!foundUser) {
            throw new NotFoundException(UserExceptionMSG.NOT_FOUND);
        }
        const updateUser: UpdateResult = await this._userRepository.update(id, { active: false });
        return updateUser.affected > 0;
    }

    async activateOne(id: number): Promise<boolean> {
        const foundUser: UserEntity = await this._userRepository.findOne(id);
        if (!foundUser) {
            throw new NotFoundException(UserExceptionMSG.NOT_FOUND);
        }
        const updateUser: UpdateResult = await this._userRepository.update(id, { active: true });
        return updateUser.affected > 0;
    }

    private buildUserData(userEntity: UserEntity): UserData {
        return {
            id: userEntity.id,
            username: userEntity.username,
            email: userEntity.email,
        };
    }

}
