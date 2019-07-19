import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { ClientsEffects } from './effects/clients.effects';
import { CallsDatesEffects } from './effects/calls-date.effects';
import { CallPlansEffects } from './effects/call-plan.effects';
import { ManagerCallsResultsEffects } from './effects/manager-calls-result.effects';
import { NomenclatureAnalyzesEffects } from './effects/nomenclature-analysis.effects';
import { RevenueAnalyzesEffects } from './effects/revenue-analysis.effects';
import { TripPlansEffects } from './effects/trip-plan.effects';
import { WeekPlansEffects } from './effects/week-plan.effects';
import { ClientsService } from 'src/app/manager-rm/clients/shared/services/clients.service';
import { ClientsFacade } from './facades/clients.facade';
import { CallPlansService } from 'src/app/manager-rm/clients/shared/services/call-plans.service';
import { CallPlanFacade } from './facades/call-plans.facade';
import { CallsDatesService } from 'src/app/manager-rm/clients/shared/services/calls-date.service';
import { CallsDateFacade } from './facades/calls-date.selectors';
import { ManagerCallsResultsService } from 'src/app/manager-rm/clients/shared/services/manager-calls-result.service';
import { ManagerCallsResultFacade } from './facades/manager-calls-result.facade';
import { NomenclatureAnalysissService } from 'src/app/manager-rm/clients/shared/services/nomenclature-analysis';
import { NomenclatureAnalysisFacade } from './facades/nomenclature-analysis.facade';
import { RevenueAnalysisService } from 'src/app/manager-rm/clients/shared/services/revenue-analysis';
import { RevenueAnalysisFacade } from './facades/revenue-analysis.facade';
import { TripPlansService } from 'src/app/manager-rm/clients/shared/services/trip-plan.service';
import { TripPlanFacade } from './facades/trip-plan.facade';
import { WeekPlansService } from 'src/app/manager-rm/clients/shared/services/week-plan.service';
import { WeekPlanFacade } from './facades/week-plan.facade';
import { clientsModuleReducers } from './reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('clients', clientsModuleReducers),
    EffectsModule.forFeature([ClientsEffects, CallsDatesEffects, CallPlansEffects, ManagerCallsResultsEffects, NomenclatureAnalyzesEffects, RevenueAnalyzesEffects, TripPlansEffects, WeekPlansEffects]),   
  ],
  providers: [
    ClientsService,
    ClientsFacade,
    CallPlansService,
    CallPlanFacade,
    CallsDatesService,
    CallsDateFacade,
    ManagerCallsResultsService,
    ManagerCallsResultFacade,
    NomenclatureAnalysissService,
    NomenclatureAnalysisFacade,
    RevenueAnalysisService,
    RevenueAnalysisFacade,
    TripPlansService,
    TripPlanFacade,
    WeekPlansService,
    WeekPlanFacade
  ]
})
export class ClientsStoreModule { }
