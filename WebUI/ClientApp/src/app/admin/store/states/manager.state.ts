import { Manager } from "../../models/manager.model";

export interface IManagerState {
    managers: Manager[],
    loading: boolean,
    error: string
}

export const managerInitialState: IManagerState = {
    managers: [],
    loading: false,
    error: null
}