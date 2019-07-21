import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { ClientsFacade } from 'src/app/store/clients/facades/clients.facade';
import { WorkgroupsFacade } from 'src/app/store/workgroups/facades/workgroup.facade';
import { CallPlanFacade } from 'src/app/store/clients/facades/call-plans.facade';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { ICallPlan } from 'src/app/manager-rm/clients/shared/models/call-plan.model';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { IWorkgroupPlans } from '../../shared/models/workgroup-plans.model';
import { WeekPlanFacade } from 'src/app/store/clients/facades/week-plan.facade';
import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';

@Component({
  selector: 'app-workgroup-plans',
  templateUrl: './workgroup-plans.component.html',
  styleUrls: ['./workgroup-plans.component.sass']
})
export class WorkgroupPlansComponent implements OnInit {

  clients$: Observable<IClient[]> = this.clientsFacade.clients$;
  weekPlans$: Observable<IWeekPlan[]> = this.weekPlanFacade.weekPlan$;
  workgroups$: Observable<IWorkgroup[]> = this.workgroupsFacade.workgroups$;

  workgroupPlans$: Observable<IWorkgroupPlans[]>;

  workgroupId;

  constructor(public route: ActivatedRoute,
    public clientsFacade: ClientsFacade,
    public workgroupsFacade: WorkgroupsFacade,
    public weekPlanFacade: WeekPlanFacade) 
  {
    this.route.paramMap.pipe(
      switchMap(params => params.get('id'))
    )
    .subscribe(res => this.workgroupId = res)
  }

  ngOnInit() {
    this.clientsFacade.loadClientsForAdmin();
    this.weekPlanFacade.loadWeekPlan(0);

    this.workgroupPlans$ = this.clients$.pipe(
      withLatestFrom(this.weekPlans$),
      map(([clients, plans]) => {
        return clients.map(client => {
          return {
            clientId: client.id,
            clientTitle: client.title,
            clientType: client.clientType,
            escortManagerPlans: plans.filter(plan => plan.clientId == client.id && plan.managerType == 10),      
            regionalManagerPlans: plans.filter(plan => plan.clientId == client.id && plan.managerType == 20)
          }
        })
      }),
      withLatestFrom(this.workgroups$),
      map(([workgroupsPlans, workgroups]) => {
        const currentWorkgroup = workgroups.find(workgroup => workgroup.id == this.workgroupId);
        
        return workgroupsPlans.filter(workgroupPlans => currentWorkgroup.clientIds.some(clientId => clientId == workgroupPlans.clientId))
      })

    );
  }

}
