import { RegistryEntity } from './registry.entity';


export interface RegistryRO {
    registry: RegistryEntity;
}

export interface RegistriesRO {
    registries: RegistryEntity[];
    count: number;
}