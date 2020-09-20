import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserRO, UsersRO } from './user.interfaces';
export declare class UserService {
    private readonly _userRepository;
    constructor(_userRepository: Repository<UserEntity>);
    findAll(): Promise<UsersRO>;
    findOneById(id: number): Promise<UserRO>;
    findOneToValidation(query: any): Promise<UserEntity>;
    createOne(dto: CreateUserDto): Promise<UserRO>;
    updateOne(dto: UpdateUserDto): Promise<UserRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
    private buildUserData;
}
