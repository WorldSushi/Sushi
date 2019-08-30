import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ClientTypeTranslatePipe } from 'src/app/store/shared/pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from 'src/app/store/shared/pipes/number-of-calls-pipe';
import { NumberOfShipmentsTranslatePipe } from 'src/app/store/shared/pipes/number-of-shipments-pipe';
import { CreateClientDialogComponent } from './dialogs/create-client-dialog/create-client-dialog.component';
import { EditClientDialogComponent } from './dialogs/edit-client-dialog/edit-client-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientGroupTranslatePipe } from 'src/app/store/shared/pipes/client-group-translate.pipe';
import { ClientPhonesComponent } from './dialogs/client-phones/client-phones.component';
import { MatSortModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, ReducerManager } from '@ngrx/store';
import { workgroupReducer } from '../../store/workgroups/reducers/workgroup.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WorkgroupsEffects } from '../../store/workgroups/effects/workgroup.effects';

@NgModule({
  declarations: [
    ClientsComponent, 
    ClientListComponent,
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe,
    CreateClientDialogComponent,
    EditClientDialogComponent,
    ClientGroupTranslatePipe,
    ClientPhonesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ workGrupe: workgroupReducer }),
    EffectsModule.forRoot([WorkgroupsEffects])
  ],
  exports: [
    ClientsComponent, 
    ClientListComponent,
  ],
  entryComponents: [
    CreateClientDialogComponent,
    EditClientDialogComponent,
    ClientPhonesComponent
  ],
})
export class ClientsModule { }
