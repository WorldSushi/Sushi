import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

export interface IWorkgroup {
    id: number,
    title: string,
    escortManagerId: number,
    escortManager: IManager,
    regionalManagerId: number,
    regionalManager: IManager,
    clientIds: number[]
}
