import { Body, Controller, Delete, Get, Param, Patch, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRO, UsersRO } from './user.interfaces';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ) { }


    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @Get()
    findAll(@Query() query: Object): Promise<UsersRO> {
        return this._userService.findAll(query);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @Get('one')
    findOne(@Query() query: Object): Promise<UserRO> {
        return this._userService.findOne(query);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<UserRO> {
        return this._userService.updateOne(id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<Boolean> {
        return this._userService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<Boolean> {
        return this._userService.activateOne(id);
    }

}
