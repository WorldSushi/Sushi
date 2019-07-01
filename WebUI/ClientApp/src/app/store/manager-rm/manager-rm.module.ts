import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { managerRmReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ClientsEffects } from './clients/effects/clients.effects';
import { ClientsService } from '../../manager-rm/clients/shared/services/clients.service';
import { ClientsFacade } from './clients/facades/clients.facade';
import { CallPlansService } from 'src/app/manager-rm/clients/shared/services/call-plans.service';
import { CallPlanFacade } from './clients/facades/call-plans.facade';
import { CallsDatesService } from 'src/app/manager-rm/clients/shared/services/calls-date.service';
import { CallsDateFacade } from './clients/facades/calls-date.selectors';
import { ManagerCallsResultsService } from 'src/app/manager-rm/clients/shared/services/manager-calls-result.service';
import { ManagerCallsResultFacade } from './clients/facades/manager-calls-result.facade';
import { NomenclatureAnalysissService } from 'src/app/manager-rm/clients/shared/services/nomenclature-analysis';
import { NomenclatureAnalysisFacade } from './clients/facades/nomenclature-analysis.facade';
import { RevenueAnalysisService } from 'src/app/manager-rm/clients/shared/services/revenue-analysis';
import { RevenueAnalysisFacade } from './clients/facades/revenue-analysis.facade';
import { TripPlansService } from 'src/app/manager-rm/clients/shared/services/trip-plan.service';
import { TripPlanFacade } from './clients/facades/trip-plan.facade';
import { WeekPlansService } from 'src/app/manager-rm/clients/shared/services/week-plan.service';
import { WeekPlanFacade } from './clients/facades/week-plan.facade';
import { CallsDatesEffects } from './clients/effects/calls-date.effects';
import { CallPlansEffects } from './clients/effects/call-plan.effects';
import { ManagerCallsResultsEffects } from './clients/effects/manager-calls-result.effects';
import { NomenclatureAnalyzesEffects } from './clients/effects/nomenclature-analysis.effects';
import { RevenueAnalyzesEffects } from './clients/effects/revenue-analysis.effects';
import { TripPlansEffects } from './clients/effects/trip-plan.effects';
import { WeekPlansEffects } from './clients/effects/week-plan.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('manager-rm', managerRmReducers),
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
export class ManagerRmStoreModule { }
