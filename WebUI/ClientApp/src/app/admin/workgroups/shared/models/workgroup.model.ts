import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

export interface IWorkgroup {
    id: number,
    title: string,
    escortManagerId: number,
    escortManagerName: string,
    escortManager: IManager,
    regionalManagerId: number,
    regionalManagerName: string,
    regionalManager: IManager,
    clientIds: number[]
}
