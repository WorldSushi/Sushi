import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { workgroupsModuleReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { WorkgroupsEffects } from './effects/workgroup.effects';
import { WorkgroupService } from 'src/app/admin/workgroups/shared/services/workgroup.service';
import { WorkgroupsFacade } from './facades/workgroup.facade';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('workgroups', workgroupsModuleReducers),
    EffectsModule.forFeature([
      WorkgroupsEffects
    ])
  ],
  providers: [
    WorkgroupService,
    WorkgroupsFacade
  ]
})
export class WorkgroupsStoreModule { }
