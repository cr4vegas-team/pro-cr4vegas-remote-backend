import { UpdateUserDto } from './dto/update-user.dto';
import { UserRO, UsersRO } from './user.interfaces';
import { UserService } from './user.service';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    findAll(): Promise<UsersRO>;
    findOne(id: number): Promise<UserRO>;
    updateOne(dto: UpdateUserDto): Promise<UserRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
