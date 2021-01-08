/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserDto, UserRO } from '../user/dto/user-response.dto';
import { UserExceptionMSG } from '../user/user-exception.msg';
import { AuthService } from './auth.service';
import { TokenRO } from './dto/auth-response.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) { }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async validate(@Request() req: any): Promise<UserDto> {
    return req.user;
  }

  @ApiQuery({
    name: 'username',
    type: String,
    description: 'Username or Email',
  })
  @ApiQuery({ name: 'password', type: String })
  @ApiQuery({ name: 'userAgent', type: String })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any): Promise<TokenRO> {
    return this._authService.getToken(req);
  }

  @ApiNotFoundResponse({ description: UserExceptionMSG.NOT_FOUND })
  @ApiConflictResponse({
    description:
      UserExceptionMSG.CONFLICT_EMAIL +
      ' | ' +
      UserExceptionMSG.CONFLICT_USERNAME,
  })
  @ApiBadRequestResponse({ description: UserExceptionMSG.BAD_REQUEST })
  @Post('signin')
  async signin(@Body() dto: UserCreateDto): Promise<UserRO> {
    return await this._authService.signin(dto);
  }
}
