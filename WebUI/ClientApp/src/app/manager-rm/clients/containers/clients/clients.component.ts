import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from '../../../../store/manager-rm/clients/facades/clients.facade';
import { Observable } from 'rxjs';
import { IClient } from '../../shared/models/client.model';
import { ICallPlan } from '../../shared/models/call-plan.model';
import { INomenclatureAnalysis } from '../../shared/models/nomenclature-analysis';
import { IRevenueAnalysis } from '../../shared/models/revenue-analysis';
import { IWeekPlan } from '../../shared/models/week-plan.model';
import { ICallsDate } from '../../shared/models/calls-date.model';
import { CallPlanFacade } from 'src/app/store/manager-rm/clients/facades/call-plans.facade';
import { WeekPlanFacade } from 'src/app/store/manager-rm/clients/facades/week-plan.facade';
import { TripPlanFacade } from 'src/app/store/manager-rm/clients/facades/trip-plan.facade';
import { ManagerCallsResultFacade } from 'src/app/store/manager-rm/clients/facades/manager-calls-result.facade';
import { CallsDateFacade } from 'src/app/store/manager-rm/clients/facades/calls-date.selectors';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {

  clients$: Observable<IClient[]> = this.clientsFacade.clients$;

  createClient(client: IClient){
    client.callPlan = this.clientCallPlanInit(client);
    client.tripPlan = {
      id: client.id,
      planned: 0,
      fact: 0,
      clientId: client.id
    }
    client.nomenclatureAnalysis = {
      id: client.id,
      reportPrevMonth: 0,
      reportAvg5Months: 0,
      prevMonth: 0,
      avg5Months: 0,
      clientId: client.id
    }
    client.revenueAnalysis = {
      id: client.id,
      reportPrevMonth: 0,
      reportAvg5Months: 0,
      prevMonth: 0,
      avg5Months: 0,
      clientId: client.id
    }
    client.weekPlans = this.clientWeekPlansInit(client);


    client.MSCallsDates = this.callsDateInit(client.id);
    client.RMCallsDates = this.callsDateInit(client.id);

    this.clientsFacade.createClient(client);
  }

  updateClient(client: IClient){
    client.callPlan = this.clientCallPlanRecalculate(client)

    this.clientsFacade.editClient(client);
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

  clientWeekPlansInit(client: IClient): IWeekPlan[]{
    return [
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: '',
          MSplanned: '',
          MSfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: '',
          MSplanned: '',
          MSfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: '',
          MSplanned: '',
          MSfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: '',
          MSplanned: '',
          MSfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: '',
          MSplanned: '',
          MSfact: ''
      }
    ]
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
        clientId: clientId
      })
    }

    return callsDate;

  }

  getDaysInMonth(month, year){
    return new Date(year, month, 0).getDate();
  }

  constructor(public clientsFacade: ClientsFacade,
    public callPlanFacade: CallPlanFacade,
    public weekPlanFacade: WeekPlanFacade,
    public tripPlanFacade: TripPlanFacade,
    public managerCallsResult: ManagerCallsResultFacade,
    public callsDateFacade: CallsDateFacade) { }

  ngOnInit() {
    this.clientsFacade.loadClients(1);
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
