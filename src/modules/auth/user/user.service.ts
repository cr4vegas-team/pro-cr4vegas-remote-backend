import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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

    async findAll(): Promise<UsersRO> {
        const qb = await this._userRepository.createQueryBuilder('users')
            .orderBy('users.created', 'DESC');
        const foundUsers: UserEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        const users: UserData[] = foundUsers.map(user => this.buildUserData(user));
        return { users, count };
    }

    async findOneById(id: number): Promise<UserRO> {
        const qb = await this._userRepository.createQueryBuilder('users')
            .where('users.id = :id', { id });
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
            .where('users.username = :username', { username: dto.username })
            .getOne();
        if (foundUsername) {
            throw new ConflictException(UserExceptionMSG.CONFLICT_USERNAME);
        }
        const foundEmail: UserEntity = await this._userRepository.createQueryBuilder('users')
            .where('users.email = :email', { email: dto.email })
            .getOne();
        if (foundEmail) {
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

    async updateOne(dto: UpdateUserDto): Promise<UserRO> {
        const foundUser: UserEntity = await this._userRepository.createQueryBuilder('users')
            .where('users.id = :id', { id: dto.id })
            .getOne();
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
        const foundUser: UserEntity = await this._userRepository.createQueryBuilder('users')
        .where('users.id = :id', { id })
        .getOne();
        if (!foundUser) {
            throw new NotFoundException(UserExceptionMSG.NOT_FOUND);
        }
        const updateUser: UpdateResult = await this._userRepository.update(id, { active: false });
        return updateUser.affected > 0;
    }

    async activateOne(id: number): Promise<boolean> {
        const foundUser: UserEntity = await this._userRepository.createQueryBuilder('users')
        .where('users.id = :id', { id })
        .getOne();
        if (!foundUser) {
            throw new NotFoundException(UserExceptionMSG.NOT_FOUND);
        }
        const updateUser: UpdateResult = await this._userRepository.update(id, { active: true });
        return updateUser.affected > 0;
    }

    // ==================================================
    // PRIVATE
    // ==================================================

    private buildUserData(userEntity: UserEntity): UserData {
        return {
            id: userEntity.id,
            username: userEntity.username,
            email: userEntity.email,
        };
    }

}
