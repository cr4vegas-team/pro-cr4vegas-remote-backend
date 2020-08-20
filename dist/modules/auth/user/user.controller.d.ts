import { UpdateUserDto } from './dto/update-user.dto';
import { UserRO, UsersRO } from './user.interfaces';
import { UserService } from './user.service';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    findAll(query: Object): Promise<UsersRO>;
    findOne(query: Object): Promise<UserRO>;
    updateOne(id: number, dto: UpdateUserDto): Promise<UserRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
