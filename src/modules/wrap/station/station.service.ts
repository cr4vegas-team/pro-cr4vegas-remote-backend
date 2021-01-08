import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitService } from '../../../modules/unit/unit/unit.service';
import { StationCreateDto } from './dto/station-create.dto';
import { StationRO, StationsRO } from './dto/station-response.dto';
import { StationUpdateDto } from './dto/station-update.dto';
import { StationExceptionMSG } from './station-exception.msg';
import { StationEntity } from './station.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly _stationRepository: Repository<StationEntity>,
    @Inject(forwardRef(() => UnitService))
    private readonly _unitService: UnitService,
  ) {}

  // ==================================================

  async findAll(): Promise<StationsRO> {
    const qb = await this._stationRepository
      .createQueryBuilder('stations')
      .leftJoinAndSelect('stations.units', 'units')
      .orderBy('stations.created', 'DESC');

    const stationsCount: number = await qb.getCount();
    const foundStations: StationEntity[] = await qb.getMany();
    return { stations: foundStations, count: stationsCount };
  }

  // ==================================================

  async findOne(id: number): Promise<StationRO> {
    const qb = await this._stationRepository
      .createQueryBuilder('stations')
      .where('stations.id = :id', { id });

    const foundStation: StationEntity = await qb.getOne();
    return { station: foundStation };
  }

  // ==================================================

  async findOneWithUnits(id: number): Promise<StationRO> {
    const qb = await this._stationRepository
      .createQueryBuilder('stations')
      .leftJoinAndSelect('stations.units', 'units')
      .where('stations.id = :id', { id });

    const foundStation: StationEntity = await qb.getOne();
    return { station: foundStation };
  }

  // ==================================================

  async createOne(dto: StationCreateDto): Promise<StationRO> {
    const foundStation: StationEntity = await this._stationRepository
      .createQueryBuilder('stations')
      .where('stations.code = :code', { code: dto.code })
      .orWhere('stations.name = :name', { name: dto.name })
      .getOne();
    if (foundStation) {
      if (foundStation.name === dto.name) {
        throw new ConflictException(StationExceptionMSG.CONFLICT_NAME);
      }
      if (foundStation.code === dto.code) {
        throw new ConflictException(StationExceptionMSG.CONFLICT_CODE);
      }
    }
    const newStation = plainToClass(StationEntity, dto);
    newStation.units = (await this._unitService.findAllByIds(dto.units)).units;
    const savedStation: StationEntity = await this._stationRepository.save(
      newStation,
    );
    return { station: savedStation };
  }

  // ==================================================

  async updateOne(dto: StationUpdateDto): Promise<StationRO> {
    const foundStationConflit: StationEntity = await this._stationRepository
      .createQueryBuilder('stations')
      .where('stations.code = :code', { code: dto.code })
      .orWhere('stations.name = :name', { name: dto.name })
      .getOne();
    if (foundStationConflit && foundStationConflit.id !== dto.id) {
      if (foundStationConflit.name === dto.name) {
        throw new ConflictException(StationExceptionMSG.CONFLICT_NAME);
      }
      if (foundStationConflit.code === dto.code) {
        throw new ConflictException(StationExceptionMSG.CONFLICT_CODE);
      }
    }
    let foundStation: StationEntity = await this._stationRepository
      .createQueryBuilder('stations')
      .where('stations.id = :id', { id: dto.id })
      .getOne();
    if (!foundStation) {
      throw new NotFoundException(StationExceptionMSG.NOT_FOUND);
    }
    foundStation = plainToClass(StationEntity, dto);
    foundStation.units = (
      await this._unitService.findAllByIds(dto.units)
    ).units;
    const updatedStation: StationEntity = await this._stationRepository.save(
      foundStation,
    );
    return { station: updatedStation };
  }

}
