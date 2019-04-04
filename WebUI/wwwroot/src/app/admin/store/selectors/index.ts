import { createFeatureSelector } from '@ngrx/store';
import { IAdminState } from '../states';

export const selectAdminState = createFeatureSelector<IAdminState>('admin');