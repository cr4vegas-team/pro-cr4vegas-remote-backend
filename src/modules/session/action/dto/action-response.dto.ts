import { ActionEntity } from '../action.entity';

export class ActionRO {
    action: ActionEntity;
}

export class ActionsRO {
    actions: ActionEntity[];
    count: number;
}