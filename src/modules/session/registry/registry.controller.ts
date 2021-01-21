import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { RegistriesRO } from './dto/registry-response.dto';
import { RegistryService } from './registry.service';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('registry')
@Controller('registry')
export class RegistryController {

    constructor(
        private readonly _registryService: RegistryService
    ) { }

    @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
    @Get()
    findAll(): Promise<RegistriesRO> {
        return this._registryService.findAll();
    }

    @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
    @Get(':sessionId')
    findAllBySessionId(@Param('sessionId') sessionId: number): Promise<RegistriesRO> {
        return this._registryService.findAllBySessionId(sessionId);
    }

    @Roles([UserRole.ADMIN])
    @Delete()
    deleteAll(): Promise<number> {
        return this._registryService.deleteAll();
    }

}
