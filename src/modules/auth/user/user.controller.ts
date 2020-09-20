import { Body, Controller, Delete, Get, Param, Patch, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRO, UsersRO } from './user.interfaces';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ) { }

    @Get()
    findAll(): Promise<UsersRO> {
        return this._userService.findAll();
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<UserRO> {
        return this._userService.findOneById(id);
    }

    @ApiBody({ type: UpdateUserDto, required: true })
    @Put()
    updateOne(@Body() dto: UpdateUserDto): Promise<UserRO> {
        return this._userService.updateOne(dto);
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<boolean> {
        return this._userService.deleteOne(id);
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<boolean> {
        return this._userService.activateOne(id);
    }

}
