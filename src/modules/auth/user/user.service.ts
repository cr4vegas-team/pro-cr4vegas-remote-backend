import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDto, UserRO, UsersRO } from './dto/user-response.dto';
import { UserRoleUpdateDto } from './dto/user-role-update.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserExceptionMSG } from './user-exception.msg';
import { UserRole } from './user-role.enum';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {
    const userFounded = this._userRepository.findOne({ where: { username: 'vegas5' } });
    if (!userFounded) {
      const user = new UserEntity();
      user.username = 'vegas5';
      user.password = 'modchip5';
      user.email = 'vegas5@cuatrovegas.es';
      user.active = 1;
      user.role = UserRole.ADMIN;
      this._userRepository.save(user);
    }
  }

  async findAll(): Promise<UsersRO> {
    const qb = await this._userRepository
      .createQueryBuilder('users')
      .orderBy('users.created', 'DESC');
    const foundUsers: UserEntity[] = await qb.getMany();
    const count: number = await qb.getCount();
    const users: UserDto[] = foundUsers.map(user => this.buildUserData(user));
    return { users, count };
  }

  async findOneById(id: number): Promise<UserRO> {
    const qb = await this._userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id });
    const foundUser: UserEntity = await qb.getOne();
    const user: UserDto = this.buildUserData(foundUser);
    return { user };
  }

  async findOneToValidation(nameOrEmail: string): Promise<UserEntity> {
    const qb = await this._userRepository.createQueryBuilder('users');
    qb.where('users.username = :username', { username: nameOrEmail });
    qb.orWhere('users.email = :email', { email: nameOrEmail });
    return qb.getOne();
  }

  async createOne(dto: UserCreateDto): Promise<UserRO> {
    const foundUsername: UserEntity = await this._userRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username: dto.username })
      .getOne();
    if (foundUsername) {
      throw new ConflictException(UserExceptionMSG.CONFLICT_USERNAME);
    }
    const foundEmail: UserEntity = await this._userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email: dto.email })
      .getOne();
    if (foundEmail) {
      throw new ConflictException(UserExceptionMSG.CONFLICT_EMAIL);
    }
    const newUser: UserEntity = new UserEntity();
    newUser.username = dto.username;
    newUser.password = dto.password;
    newUser.email = dto.email;
    newUser.active = 1;
    newUser.role = UserRole.NONE;
    const savedUser: UserEntity = await this._userRepository.save(newUser);
    const user: UserDto = this.buildUserData(savedUser);
    return { user };
  }

  async updateOne(dto: UpdateUserDto): Promise<UserRO> {
    const foundUser: UserEntity = await this._userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id: dto.id })
      .getOne();
    if (!foundUser) {
      throw new NotFoundException(UserExceptionMSG.NOT_FOUND);
    }
    foundUser.username = dto.username ? dto.username : foundUser.username;
    foundUser.password = dto.password ? dto.password : foundUser.password;
    foundUser.email = dto.email ? dto.email : foundUser.email;
    foundUser.active = dto.active;
    const updatedUser: UserEntity = await this._userRepository.save(foundUser);
    const user = this.buildUserData(updatedUser);
    return { user };
  }

  async updateUserRole(dto: UserRoleUpdateDto): Promise<UserRO> {
    const foundUser: UserEntity = await this._userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id: dto.id })
      .getOne();
    if (!foundUser) {
      throw new NotFoundException(UserExceptionMSG.NOT_FOUND);
    }
    foundUser.role = dto.role;
    const updatedUser: UserEntity = await this._userRepository.save(foundUser);
    const user = this.buildUserData(updatedUser);
    return { user };
  }

  private buildUserData(userEntity: UserEntity): UserDto {
    return {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      role: userEntity.role,
      active: userEntity.active,
    };
  }
}
