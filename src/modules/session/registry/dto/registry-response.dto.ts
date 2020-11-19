import { RegistryEntity } from '../registry.entity';


export class RegistryRO {
    registry: RegistryEntity;
}

export class RegistriesRO {
    registries: RegistryEntity[];
    count: number;
}