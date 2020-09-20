import { ManageEntity } from './manage.entity';
export interface ManageRO {
    manage: ManageEntity;
}
export interface ManagesRO {
    manages: ManageEntity[];
    count: number;
}
