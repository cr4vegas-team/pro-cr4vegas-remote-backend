import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { UserRO, UsersRO } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserExceptionMSG } from './user-exception.msg';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  findAll(): Promise<UsersRO> {
    return this._userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserRO> {
    return this._userService.findOneById(id);
  }

  @ApiNotFoundResponse({ description: UserExceptionMSG.NOT_FOUND })
  @Put()
  updateOne(@Body() dto: UpdateUserDto): Promise<UserRO> {
    return this._userService.updateOne(dto);
  }
}
