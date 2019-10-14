import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ICallsDate } from '../../shared/models/calls-date.model';
import { weekPlanQueries } from 'src/app/store/clients/selectors/week-plan.selectors';
import { ninvoke } from 'q';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { IWorkgroup } from '../../../../admin/workgroups/shared/models/workgroup.model';
import { HttpClient } from '@angular/common/http';
import { $ } from 'protractor';
import { AcceptManager } from '../../../../manager-rm/clients/shared/models/accept-manager.model';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { IgxCalendarComponent } from 'igniteui-angular';
import { async } from '@angular/core/testing';

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


  displayedColumns: string[] = ['status', 'statusCall', 'direction', "answer", 'title', 'phone', 'duration', 'date', 'comentCon', 'comentCli', 'refAudio']

  calendarHidden: string = "hidden";
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  btnDate: string = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
  direction = 0;
  txtNumber = "";

  ngOnChanges() {
  }

  applyFilter(filterValue: string) {
    this.txtNumber = filterValue;
    this.sortCalls();
  }

  changeDirection() {
    this.sortCalls();
  }

   verifyRange(dates: Date[]) {
    if (dates && dates.length != 0) {
      this.dateStart = dates[0];
      this.dateEnd = dates[dates.length - 1];
      this.btnDate = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
      this.sortCalls();
    }
  }

  sortCalls() {
    this.acceptManagers = [];
    let direction = this.direction == 1 ? "Исходящий" : this.direction == 2 ? "Входящий" : "";
    this.managers.forEach((item) => {
      let colleCallsDate = this.cientAccept.filter(c => c.managerId == item.id
        && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
        && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
        && (direction == "" || direction == c.direction)
        && (this.txtNumber == "" || c.phone.indexOf(this.txtNumber) != -1 || c.titleClient.indexOf(this.txtNumber) != -1));
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

  hiddenCalendar() {
    if (this.calendarHidden == "hidden") {
      this.calendarHidden = "";
    }
    else {
      this.calendarHidden = "hidden";
    }
  }

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
    });

  }

  getcallsDater() {
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe((data: ClientAccept[]) => {
      this.cientAccept = data;
      this.sortCalls();
      this.cdr.detectChanges();
    });
  }

  hidenTable($event) {
    if ($event.currentTarget.children[1].hidden) {
      $event.currentTarget.children[1].hidden = false;
    }
    else {
      $event.currentTarget.children[1].hidden = true;
    }
  }

  setNoAccept($event, callId, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    if (comentControler != undefined || comentControler != "") {
      this.http.get('api/conroler/ClientAccept/NoAcceptCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
      $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#DF013A";
    }
  }

  setAccept($event, callId, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    this.http.get('api/conroler/ClientAccept/DefaultCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
    $event.currentTarget.offsetParent.children[0].value = "";
    $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#FAFAFA";
  }

  setBagroundStatus(element) {
    if (element.callsComments) {
      if (element.callsComments.acceptControlerCalss == 2) {
        return "#2EFE9A";
      }
      else if (element.callsComments.acceptControlerCalss == 1) {
        return "#DF013A";
      }
      else {
        return "#FAFAFA";
      }
    }
    else {
      return "#FAFAFA";
    }
  }

  ngOnInit() {
    this.getManager();
    this.getcallsDater();
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {

  }
}
