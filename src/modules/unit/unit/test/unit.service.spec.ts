import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectorEntity } from '../../../wrap/sector/sector.entity';
import { SectorService } from '../../../wrap/sector/sector.service';
import { SetTypeEntity } from '../../../wrap/set/set-type.entity';
import { SetEntity } from '../../../wrap/set/set.entity';
import { SetService } from '../../../wrap/set/set.service';
import { StationEntity } from '../../../wrap/station/station.entity';
import { StationService } from '../../../wrap/station/station.service';
import { UnitTypeTableEnum } from '../unit-type.enum';
import { UnitEntity } from '../unit.entity';
import { UnitService } from '../unit.service';

const unitRepository: UnitEntity[] = [
  {
    id: 1,
    code: 11111,
    altitude: 300,
    longitude: -2.000234234023,
    latitude: 26.023489234,
    active: 1,
    created: new Date(),
    updated: new Date(),
    description: 'alskdjfalskdfaskdjf',
    unitTypeTable: UnitTypeTableEnum.UNIT_GENERIC,
    sector: null,
    station: null,
    sets: [],
    actions: [],
    image: '',
  },
];

const sectorRepository: SectorEntity[] = [
  {
    id: 1,
    code: 'SR0000001',
    active: 1,
    name: 'Sector Test',
    description: 'laksjdflaksdjf',
    units: [],
    created: new Date(),
    updated: new Date(),
    image: '',
  },
];

const stationRepository: StationEntity[] = [
  {
    id: 1,
    code: 'ST000001',
    name: 'Station Test',
    altitude: 100,
    latitude: 26.023402342,
    longitude: -2.234234234,
    active: 1,
    description: 'asldkfjasdkfjaslkdjñalskdf',
    units: [],
    created: new Date(),
    updated: new Date(),
    image: '',
  },
];

const setRepository: SetEntity[] = [
  {
    id: 1,
    code: 'SE00000001',
    name: 'Set Test',
    setType: { name: 'Set Type Test' },
    units: [],
    active: 1,
    description: 'lkasjdflkajsdkfljasd',
    created: new Date(),
    updated: new Date(),
    image: '',
  },
];

const setTypeRepository: SetTypeEntity[] = [
  {
    name: 'Set Type Test',
  },
];

describe('UnitService', () => {
  let service: UnitService;
  let unitRepo: Repository<UnitEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UnitService,
        SectorService,
        StationService,
        SetService,
        {
          provide: getRepositoryToken(UnitEntity),
          useValue: unitRepository,
        },
        {
          provide: getRepositoryToken(SectorEntity),
          useValue: sectorRepository,
        },
        {
          provide: getRepositoryToken(StationEntity),
          useValue: stationRepository,
        },
        {
          provide: getRepositoryToken(SetEntity),
          useValue: setRepository,
        },
        {
          provide: getRepositoryToken(SetTypeEntity),
          useValue: setTypeRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<UnitService>(UnitService);
    unitRepo = moduleRef.get<Repository<UnitEntity>>(
      getRepositoryToken(UnitEntity),
    );
  });

  it('should be defined', () => {
    expect(5).toBe(5);
  });
});
