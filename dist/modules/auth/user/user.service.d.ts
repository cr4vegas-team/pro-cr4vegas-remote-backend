import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRO, UsersRO } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserEntity } from './user.entity';
export declare class UserService {
    private readonly _userRepository;
    constructor(_userRepository: Repository<UserEntity>);
    findAll(): Promise<UsersRO>;
    findOneById(id: number): Promise<UserRO>;
    findOneToValidation(nameOrEmail: string): Promise<UserEntity>;
    createOne(dto: UserCreateDto): Promise<UserRO>;
    updateOne(dto: UpdateUserDto): Promise<UserRO>;
    private buildUserData;
}
