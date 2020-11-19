import { UserRO, UsersRO } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    findAll(): Promise<UsersRO>;
    findOne(id: number): Promise<UserRO>;
    updateOne(dto: UpdateUserDto): Promise<UserRO>;
}
