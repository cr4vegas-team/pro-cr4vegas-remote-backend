import { SessionEntity } from '../../session/session.entity';

export class RegistryDto {
    id: number;
    session: SessionEntity;
    method: string;
    originalUrl: string;
    body: any;
    created: Date;
}

export class RegistryRO {
    registry: RegistryDto;
}

export class RegistriesRO {
    registries: RegistryDto[];
    count: number;
}