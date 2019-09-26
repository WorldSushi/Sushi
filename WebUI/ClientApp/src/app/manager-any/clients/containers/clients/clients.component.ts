import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClientsFacade } from '../../../../store/clients/facades/clients.facade';
import { Observable } from 'rxjs';
import { IClient } from '../../shared/models/client.model';
import { ICallPlan } from '../../shared/models/call-plan.model';
import { INomenclatureAnalysis } from '../../shared/models/nomenclature-analysis';
import { IRevenueAnalysis } from '../../shared/models/revenue-analysis';
import { IWeekPlan } from '../../shared/models/week-plan.model';
import { ICallsDate } from '../../shared/models/calls-date.model';
import { CallPlanFacade } from 'src/app/store/clients/facades/call-plans.facade';
import { WeekPlanFacade } from 'src/app/store/clients/facades/week-plan.facade';
import { TripPlanFacade } from 'src/app/store/clients/facades/trip-plan.facade';
import { ManagerCallsResultFacade } from 'src/app/store/clients/facades/manager-calls-result.facade';
import { CallsDateFacade } from 'src/app/store/clients/facades/calls-date.selectors';
import { ITripPlan } from '../../shared/models/trip-plan.model';
import { IUser } from 'src/app/shared/models/user.model';
import { UserFacade } from 'src/app/store/app/facades/user.facade';
import { map, withLatestFrom } from 'rxjs/operators';
import { WorkgroupsFacade } from '../../../../store/workgroups/facades/workgroup.facade';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  manager$: Observable<IUser> = this.userFacade.currentUser$;

  getWeek(date: string) {
    this.weekPlanFacade.loadWeekPlan(1);
  }

  createClient(client: IClient){ 
    this.clientsFacade.createClient(client);
  }

  updateClient(client: IClient){
    this.clientsFacade.editClient(client);
  }

  updateCallPlan(callPlan: ICallPlan){
    this.callPlanFacade.editCallPlan(callPlan);
  }

  updateTripPlanHours(tripPlan: ITripPlan){
    this.tripPlanFacade.editTripPlanHours(tripPlan);
  }

  updateTripPlanCompletedType(tripPlan: ITripPlan){
    this.tripPlanFacade.editTripPlanCompletedType(tripPlan);
  }

  updateWeekPlan(weekPlan: IWeekPlan){
    this.weekPlanFacade.editWeekPlan(weekPlan);
  }

  createWeekPlan(weekPlan: IWeekPlan){
    this.weekPlanFacade.createWeekPlan(weekPlan);
  }

  addFactToWeekPlan(weekPlan: IWeekPlan){
    this.weekPlanFacade.addFactToWeekPlan(weekPlan);
  }

  createCallsDate(clientContact) {
    this.callsDateFacade.createCallsDate(clientContact);
  }

  createCallPlan(callPlan) {
    this.callPlanFacade.createCallPlan(callPlan);
  }

  createTripPlan(tripPlan){
    this.tripPlanFacade.createTripPlan(tripPlan);
  }

  clientCallPlanInit(client: IClient): ICallPlan {
    return {
      id: 0,
      totalCalls: this.translateNumberOfCallsToCollectiveCalls(client.numberOfCalls),
      regionalManagerCalls: this.translateNumberOfCallsToCollectiveCalls(client.numberOfCalls),
      escortManagerCalls: 0,
      clientId: client.id
    }
  }



  clientCallPlanRecalculate(client: IClient): ICallPlan {
    client.callPlan.totalCalls = this.translateNumberOfCallsToCollectiveCalls(client.numberOfCalls);
    return {
      ...client.callPlan,
      escortManagerCalls: client.callPlan.escortManagerCalls,
      regionalManagerCalls: client.callPlan.totalCalls - client.callPlan.escortManagerCalls
    }
  }

  callsDateInit(clientId: number) {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const daysAmount = this.getDaysInMonth(currentMonth, currentYear);

    const callsDate: ICallsDate[] = [];
    
    for(let i = 0; i < daysAmount; i++){
      callsDate.push({
        id: i + 1,
        contactType: 0,
        managerType: 10,
        date: new Date(),
        clientId: clientId,
        managerId: 0,
        durations: 0,
      })
    }

    return callsDate;

  }

  getDaysInMonth(month, year){
    return new Date(year, month, 0).getDate();
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

  constructor(public clientsFacade: ClientsFacade,
    public callPlanFacade: CallPlanFacade,
    public workgroupsFacade: WorkgroupsFacade,
    public weekPlanFacade: WeekPlanFacade,
    public tripPlanFacade: TripPlanFacade,
    public managerCallsResult: ManagerCallsResultFacade,
    public callsDateFacade: CallsDateFacade,
    public userFacade: UserFacade) { }

  ngOnInit() {
    this.userFacade.loadCurrentUser();
    this.clientsFacade.loadClientsForManager(1);
    this.workgroupsFacade.loadWorkgroups();
    this.callPlanFacade.loadCallPlan(1);
    this.weekPlanFacade.loadWeekPlan(1);
    this.tripPlanFacade.loadTripPlan(1);
    this.managerCallsResult.loadManagerCallsResult(1);
    this.callsDateFacade.loadCallsDate(1);
  }

  translateNumberOfCallsToCollectiveCalls(numberOfCalls): number {
    if(numberOfCalls != 90)
      return numberOfCalls / 10

    else
      return (numberOfCalls - 10) / 10
  }
}
