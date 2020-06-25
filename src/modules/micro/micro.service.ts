import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { MicroEntity } from './entity/micro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadMicroDto, CreateMicroDto, UpdateMicroDto } from './dto';
import { plainToClass } from 'class-transformer';
import { UnitEntity } from '../unit/entity/unit.entity';

@Injectable()
export class MicroService {

    constructor(
        @InjectRepository(MicroEntity)
        private readonly _microRepository: Repository<MicroEntity>,
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }


    async getMicros(): Promise<ReadMicroDto[]> {
        const foundMicros: MicroEntity[] = await this._microRepository.find();
        return foundMicros.map((micro: MicroEntity) => plainToClass(ReadMicroDto, micro));
    }

    async getMicroById(id: number): Promise<ReadMicroDto> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(id);
        if (foundMicro) {
            return plainToClass(ReadMicroDto, foundMicro);
        } else {
            throw new NotFoundException();
        }
    }

    async createMicro(dto: CreateMicroDto): Promise<ReadMicroDto> {
        const unitFound: UnitEntity = await this._unitRepository.findOne(dto.unit_code);
        if (unitFound) {
            const micro: MicroEntity = plainToClass(MicroEntity, dto, { enableImplicitConversion: true });
            micro.unit = unitFound;
            const savedMicro: MicroEntity = await this._microRepository.save(micro);
            return plainToClass(ReadMicroDto, savedMicro);
        } else {
            throw new HttpException('No se encontró la unidad relacionada', HttpStatus.NOT_FOUND);
        }
    }

    async updateMicro(id: number, dto: UpdateMicroDto): Promise<ReadMicroDto> {
        const unitFound: UnitEntity = await this._unitRepository.findOne(dto.unit_code);
        if (unitFound) {
            const foundMicro: MicroEntity = await this._microRepository.findOne(id);
            if (foundMicro) {
                foundMicro.unit = unitFound;
                foundMicro.communication = dto.communication;
                foundMicro.priority = dto.priority;
                foundMicro.mark = dto.mark;
                foundMicro.model = dto.model;
                foundMicro.code = dto.code;
                const updatedMicro: MicroEntity = await this._microRepository.save(foundMicro);
                return plainToClass(ReadMicroDto, updatedMicro);

            } else {
                throw new NotFoundException();
            }
        } else {
            throw new HttpException('No se encontró la unidad relacionada', HttpStatus.NOT_FOUND);
        }
    }

    async deleteMicro(id: number): Promise<boolean> {
        const microFound: UnitEntity = await this._unitRepository.findOne(id);
        if (microFound) {
            microFound.active = false;
            this._microRepository.save(microFound);
            return true;
        } else {
            throw new NotFoundException();
        }
    }

}
