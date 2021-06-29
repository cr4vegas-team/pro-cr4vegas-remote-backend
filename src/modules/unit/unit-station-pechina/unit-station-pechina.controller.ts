/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth/jwt-auth.guard';
import { Roles } from 'src/modules/auth/user/user-role.decorator';
import { UserRole } from 'src/modules/auth/user/user-role.enum';
import { UserRoleGuard } from 'src/modules/auth/user/user-role.guard';
import { RegistryService } from 'src/modules/session/registry/registry.service';
import { UnitStationPechinaUpdateDto } from './dto/unit-station-pechina-update.dto';
import { UnitStationPechinaEntity } from './unit-station-pechina.entity';
import { UnitStationPechinaService } from './unit-station-pechina.service';

@ApiTags('unit-station-pechina')
@Controller('unit-station-pechina')
export class UnitStationPechinaController {
    constructor(
        private readonly _unitStationPechinaService: UnitStationPechinaService,
        private readonly _registryService: RegistryService,
    ) { }

    @Get()
    async getStation(): Promise<UnitStationPechinaEntity> {
        return await this._unitStationPechinaService.getStation();
    }

    @UseGuards(JwtAuthGuard, UserRoleGuard)
    @Roles([UserRole.ADMIN, UserRole.MODERATOR])
    @Put()
    async updateOne(@Req() req: any, @Body() dto: UnitStationPechinaUpdateDto): Promise<UnitStationPechinaEntity> {
        const unitStationPechinaRO = await this._unitStationPechinaService.updateOne(dto);
        await this._registryService.insertOne(req);
        return unitStationPechinaRO;
    }
}
