import { IWorkgroup } from '../../admin/workgroups/shared/models/workgroup.model';

export interface IUser {
    id: number,
    login: string,
  role: string,
  workgroup: IWorkgroup
}
