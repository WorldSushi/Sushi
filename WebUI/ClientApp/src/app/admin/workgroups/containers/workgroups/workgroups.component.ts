import { Component, OnInit } from '@angular/core';
import { WorkgroupsFacade } from 'src/app/store/workgroups/facades/workgroup.facade';
import { Observable } from 'rxjs';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { ManagersFacade } from 'src/app/store/managers/facades/manager.facade';
import { ClientsFacade } from 'src/app/store/clients/facades/clients.facade';
import { withLatestFrom, map } from 'rxjs/operators';
import { CallPlanFacade } from 'src/app/store/clients/facades/call-plans.facade';
import { TripPlanFacade } from 'src/app/store/clients/facades/trip-plan.facade';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { IClientAction } from '../../shared/models/client-action.model';
import { CallsDateFacade } from 'src/app/store/clients/facades/calls-date.selectors';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';

@Component({
  selector: 'app-workgroups',
  templateUrl: './workgroups.component.html',
  styleUrls: ['./workgroups.component.sass']
})
export class WorkgroupsComponent implements OnInit {

  workgroups$: Observable<any> = this.workgroupsFacade.workgroups$
    .pipe(
      withLatestFrom(this.clientsFacade.clients$),
      map(([workgroups, clients]) => {
        return workgroups.map(workgroup => {
          return {
            ...workgroup,
            clients: clients.filter(client => workgroup.clientIds.some(clientId => client.id == clientId))
          }
        })
      }),
      withLatestFrom(this.callPlanFacade.callPlan$),
      map(([workgroups, callPlans]) => {
        return workgroups.map(workgroup => {
          return {
            ...workgroup,
            clients: workgroup.clients.map(client => {
              return {
                ...client,
                callPlan: callPlans.find(callPlan => callPlan.clientId == client.id) 
                  ? callPlans.find(callPlan => callPlan.clientId == client.id) 
                  : { totalCalls: 0, escortManagerCalls: 0, regionalManagerCalls: 0 }
              }
            })
          }
        })
      }),
      withLatestFrom(this.tripPlanFacade.tripPlan$),
      map(([workgroups, tripPlans]) => {
        return workgroups.map(workgroup => {
          return {
            ...workgroup,
            clients: workgroup.clients.map(client => {
              return {
                ...client,
                tripPlan: tripPlans.find(callPlan => callPlan.clientId == client.id)
                  ? tripPlans.find(callPlan => callPlan.clientId == client.id)
                  : { hours: 0, completedType: 0 }
              }
            })
          }
        })
      })
    );

  freeClients$: Observable<IClient[]> = this.clientsFacade.clients$.pipe(map(res => res.filter(item => !item.hasWorkgroup)))
  freeManagers$: Observable<IManager[]> = this.managersFacade.managers$;
  clientContacts$: Observable<ICallsDate[]> = this.callsDateFacade.callsDate$.pipe(map(res => res.filter(item => item.contactType == 40 || item.contactType == 30 || item.contactType == 20)));

  addClientToWorkGroup(data){
    this.workgroupsFacade.addClientToWorkgroup(data);
  }

  createWorkgroup(workgroup){
    this.workgroupsFacade.createWorkgroup(workgroup);
  }

  updateWorkgroup(data) {
    this.workgroupsFacade.changeEscortManager({ workgroupId: data.workgroup.id, escortManagerId: data.workgroup.escortManagerId });
    this.workgroupsFacade.changeRegionalManager({ workgroupId: data.workgroup.id, regionalManagerId: data.workgroup.regionalManagerId })

    this.managersFacade.loadManagers();
    this.workgroupsFacade.loadWorkgroups();
  }

  constructor(public workgroupsFacade: WorkgroupsFacade,
    public clientsFacade: ClientsFacade,
    public managersFacade: ManagersFacade,
    public callPlanFacade: CallPlanFacade,
    public tripPlanFacade: TripPlanFacade,
    public callsDateFacade: CallsDateFacade) {  
      this.clientsFacade.loadClientsForAdmin(); 
      this.workgroupsFacade.loadWorkgroups();       
      this.callPlanFacade.loadCallPlan(0);
      this.tripPlanFacade.loadTripPlan(0);
      this.managersFacade.loadManagers();    
      this.callsDateFacade.loadCallsDate(0);
    }

  ngOnInit() {
    
  }

}
