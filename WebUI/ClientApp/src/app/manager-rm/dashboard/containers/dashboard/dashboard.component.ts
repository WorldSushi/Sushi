import { Component, OnInit } from '@angular/core';
import { CallsDateFacade } from 'src/app/store/clients/facades/calls-date.selectors';
import { Observable } from 'rxjs';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  clientContactsAmountToday$: Observable<number> = this.callsDateFacade.callsDate$.pipe(
    map(res => res.filter(item => item.date == new Date().toLocaleDateString()).length)
  );

  constructor(public callsDateFacade: CallsDateFacade) { }

  ngOnInit() {
  }

}
