import { ManageCreateDto } from './manage-create.dto';
import { ManageService } from './manage.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ManageRO, ManagesRO } from './manage.interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('manage')
@Controller('manage')
export class ManageController {

    constructor(
        private readonly _manageService: ManageService
    ) { }

    @Get()
    findAll(): Promise<ManagesRO> {
        return this._manageService.findAll();
    }

    @Get(':controlId')
    findAllByControlId(@Param('controlId') controlId: number): Promise<ManagesRO> {
        return this._manageService.findAllByControlId(controlId);
    }

    @Post()
    insertOne(@Body() manageCreateDto: ManageCreateDto): Promise<ManageRO> {
        return this._manageService.insertOne(manageCreateDto);
    }

}
