import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from 'src/app/store/clients/facades/clients.facade';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { map, withLatestFrom } from 'rxjs/operators';
import { WorkgroupsFacade } from '../../../../store/workgroups/facades/workgroup.facade';
import { ManagersFacade } from '../../../../store/managers/facades/manager.facade';
import { CallPlanFacade } from '../../../../store/clients/facades/call-plans.facade';
import { TripPlanFacade } from '../../../../store/clients/facades/trip-plan.facade';
import { CallsDateFacade } from '../../../../store/clients/facades/calls-date.selectors';
import { IManager } from '../../../managers/shared/models/manager.model';
import { ICallsDate } from '../../../../manager-rm/clients/shared/models/calls-date.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  
  clients$: Observable<IClient[]> = this.clientsFacade.clients$.pipe(
    map(res => {
      let actualData = res.filter(item => item.group > 0);
      let undefinedData = res.filter(item => item.group == 0);
  
      actualData = actualData.sort((a, b) => a.group < b.group ? -1 : 1);
  
      return [...actualData, ...undefinedData];
    })
  );

  createClient(client: IClient){
    this.clientsFacade.adminCreateClient(client);
  }

  updateClient(client: IClient){
    this.clientsFacade.adminEditClient(client);
  }
  

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
  freeManagers$: Observable<IManager[]> = this.managersFacade.managers$.pipe(map(res => res.filter(item => item.workgroupId == 0 || item.workgroupId == null)))
  clientContacts$: Observable<ICallsDate[]> = this.callsDateFacade.callsDate$;

  addClientToWorkGroup(data) {
    this.workgroupsFacade.addClientToWorkgroup(data);
  }

  createWorkgroup(workgroup) {
    this.workgroupsFacade.createWorkgroup(workgroup);
  }

  updateWorkgroup(data) {
    this.workgroupsFacade.changeEscortManager({ workgroupId: data.workgroup.id, escortManagerId: data.workgroup.escortManagerId });
    this.workgroupsFacade.changeRegionalManager({ workgroupId: data.workgroup.id, regionalManagerId: data.workgroup.regionalManagerId })

    this.managersFacade.loadManagers();
    this.workgroupsFacade.loadWorkgroups();
  }

  constructor(public clientsFacade: ClientsFacade,
    public workgroupsFacade: WorkgroupsFacade,
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
    this.clientsFacade.loadClientsForAdmin();
  }

}
