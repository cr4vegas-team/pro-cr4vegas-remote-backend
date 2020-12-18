import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
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
  constructor(private readonly _authService: AuthService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('auth')
  async validate(@Request() req: any): Promise<UserDto> {
    return req.user;
  }

  @ApiQuery({
    name: 'username',
    type: String,
    description: 'Username or Email',
  })
  @ApiQuery({ name: 'password', type: String })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<TokenRO> {
    return this._authService.getToken(req.user);
  }

  @ApiNotFoundResponse({ description: UserExceptionMSG.NOT_FOUND })
  @ApiConflictResponse({
    description:
      UserExceptionMSG.CONFLICT_EMAIL +
      ' | ' +
      UserExceptionMSG.CONFLICT_USERNAME,
  })
  @ApiBadRequestResponse({ description: UserExceptionMSG.BAD_REQUEST })
  @Post('auth/signin')
  async signin(@Body() dto: UserCreateDto): Promise<UserRO> {
    return await this._authService.signin(dto);
  }
}