import { Component, OnInit } from '@angular/core';
import { CallsDateFacade } from 'src/app/store/clients/facades/calls-date.selectors';
import { Observable } from 'rxjs';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { map, withLatestFrom } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { UserFacade } from 'src/app/store/app/facades/user.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  clientContactsAmountToday$: Observable<number> = this.callsDateFacade.callsDate$.pipe(
    map(res => res.filter(item => item.date == new Date().toLocaleDateString())),
    withLatestFrom(this.userFacade.currentUser$),
    map(([clientContacts, manager]) => clientContacts.filter(item => item.managerId == manager.id).length)
  );

  clientContacts$ = this.clientContactFacade.callsDate$.pipe(
    withLatestFrom(this.userFacade.currentUser$),
    map(([clientContacts, manager]) => {
      return clientContacts.filter(item => item.managerId == manager.workgroup.escortManagerId || item.managerId == manager.workgroup.regionalManagerId)
    })
  )

  constructor(public callsDateFacade: CallsDateFacade,
    public userFacade: UserFacade,
    public clientContactFacade: CallsDateFacade) { }

  ngOnInit() {
  }

}
