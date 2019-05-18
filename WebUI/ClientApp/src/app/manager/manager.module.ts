import { NgModule } from "@angular/core";
import { ClientComponent } from './containers/client/client.component';
import { ClientListComponent, MonthlyCallPlanDialog, ManagerCallsDialog } from './components/client-list/client-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ClientEffects } from './store/effects/client.effects';
import { CLientService } from './services/client.service';
import { managerReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManagerRoutingModule } from './manager-routing.module';
import { MaterialModule } from '../material/material.module';
import { MonthlyCallPlanService } from './services/monthlyCallPlan.service';
import { MonthlyCallPlanEffects } from './store/effects/monthlyCallPlan.effects';
import { ManagerComponent } from "./manager.component";
import { LayoutModule } from "./layout/layout.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessTripDialog } from './components/client-list/dialogs/business-trip/business-trip.dialog';
import { BusinessTripPlanService } from './services/businessTripPlan.service';

@NgModule({
    declarations: [ClientComponent, 
        ClientListComponent, 
        ManagerComponent,
        MonthlyCallPlanDialog,
        ManagerCallsDialog,
        BusinessTripDialog
    ],
    entryComponents: [
        MonthlyCallPlanDialog,
        ManagerCallsDialog,
        BusinessTripDialog
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        HttpClientModule,
        StoreModule.forFeature('manager', managerReducer),
        EffectsModule.forFeature([ClientEffects, MonthlyCallPlanEffects]),
        MaterialModule,
        LayoutModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        CLientService, 
        MonthlyCallPlanService,
        BusinessTripPlanService
    ]
})
export class ManagerModule {}