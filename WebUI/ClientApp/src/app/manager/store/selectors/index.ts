import { IManagerState } from '../states';
import { createFeatureSelector } from '@ngrx/store';

export const selectManagerState = createFeatureSelector<IManagerState>('manager');