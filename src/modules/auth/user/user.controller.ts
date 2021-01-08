import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UserRO, UsersRO } from './dto/user-response.dto';
import { UserRoleUpdateDto } from './dto/user-role-update.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserExceptionMSG } from './user-exception.msg';
import { Roles } from './user-role.decorator';
import { UserRole } from './user-role.enum';
import { UserRoleGuard } from './user-role.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @Get()
  findAll(): Promise<UsersRO> {
    return this._userService.findAll();
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserRO> {
    return this._userService.findOneById(id);
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @ApiNotFoundResponse({ description: UserExceptionMSG.NOT_FOUND })
  @Put()
  updateOne(@Body() dto: UpdateUserDto): Promise<UserRO> {
    return this._userService.updateOne(dto);
  }

  @Roles([UserRole.ADMIN])
  @ApiNotFoundResponse({ description: UserExceptionMSG.NOT_FOUND })
  @Put('/role')
  updateUserRole(@Body() dto: UserRoleUpdateDto): Promise<UserRO> {
    return this._userService.updateUserRole(dto);
  }
}
