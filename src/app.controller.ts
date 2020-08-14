import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/auth/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/auth/local-auth.guard';
import { CreateUserDto } from './modules/auth/user/dto/create-user.dto';
import { UserRO } from './modules/auth/user/user.interfaces';

@Controller()
@ApiTags('auth')
export class AppController {

  constructor(
    private readonly _authService: AuthService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  validate(@Request() req) { 
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }

  @Post('auth/signin')
  async signin(@Body() dto: CreateUserDto): Promise<UserRO> {
    return this._authService.signin(dto);
  }

}
