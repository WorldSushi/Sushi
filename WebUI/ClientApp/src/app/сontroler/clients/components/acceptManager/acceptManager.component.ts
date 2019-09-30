import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { IClient } from '../../shared/models/client.model';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { IRevenueAnalysis } from '../../shared/models/revenue-analysis';
import { IWeekPlan } from '../../shared/models/week-plan.model';
import { ICallsDate } from '../../shared/models/calls-date.model';
import { ICallPlan } from '../../shared/models/call-plan.model';
import { ITripPlan } from '../../shared/models/trip-plan.model';
import { weekPlanQueries } from 'src/app/store/clients/selectors/week-plan.selectors';
import { ninvoke } from 'q';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { IWorkgroup } from '../../../../admin/workgroups/shared/models/workgroup.model';
import { HttpClient } from '@angular/common/http';
import { $ } from 'protractor';
import { AcceptManager } from '../../../../manager-rm/clients/shared/models/accept-manager.model';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';

@Component({
  selector: 'app-Accept-Manager',
  templateUrl: './acceptManager.component.html',
  styleUrls: ['./acceptManager.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcceptManagerComponent implements OnInit {

  @Input() managers: IManager[] = [];
  @Input() cientAccept: ClientAccept[] = [];

  acceptManagers: AcceptManager[] = [];


  displayedColumns: string[] = ['title', 'phone', 'duration', 'refAudio', 'controls', 'date']

  ngOnChanges() {
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == "Менеджр");
      this.cdr.detectChanges();
    });

  }

  AccepCallsControler(element: ICallsDate) {
    this.acceptManagers.find(a => a.id == element.managerId).callsDate = this.acceptManagers.find(a => a.id == element.managerId).callsDate.filter(c => c.id != element.id);
    this.cdr.detectChanges();
    this.http.get('api/conroler/ClientAccept/AcceptCall?id=' + element.id).subscribe();
  }

  getcallsDater() {
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe((data: ClientAccept[]) => {
      this.cientAccept = data.filter(r => r.durations > 149 && r.contactType == 40);
      this.sortManagerToCalls();
      this.cdr.detectChanges();
    });

  }

  sortManagerToCalls() {
    this.managers.forEach((item) => {
      let colleCallsDate = this.cientAccept.filter(c => c.managerId == item.id);
      let newItem: AcceptManager = {
        id: item.id,
        login: item.login,
        phone: item.phone,
        callsDate: colleCallsDate
      }
      this.acceptManagers.push(newItem);
    });
    console.log(this.acceptManagers);
  }

  ngOnInit() {
    this.getManager();
    this.getcallsDater();
  }

}
//
