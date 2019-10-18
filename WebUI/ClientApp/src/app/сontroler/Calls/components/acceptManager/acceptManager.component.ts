import { Component, OnInit, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { HttpClient } from '@angular/common/http';
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

  @Input() acceptManagers: AcceptManager[] = [];


  displayedColumns: string[] = ['status', 'statusCall', 'direction', "answer", 'title', 'phone', 'duration', 'date', 'comentCon', 'comentCli', 'refAudio']

  calendarHidden: string = "hidden";
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  btnDate: string = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
  direction = 0;
  txtNumber = "";
  durationTxt: number = -1;

  ngOnChanges() {
  }

  applyFilterNumberOrname(filterValue: string) {
    this.txtNumber = filterValue;
    this.sortCalls();
  }

  applyFilterDuration(filterValue: string) {
    let rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    let temValue = 0;
    if (filterValue != "" && !rep.test(filterValue)) {
      temValue = Number(filterValue);
    }
    else {
      temValue = -1;
    }
    if (this.durationTxt != temValue) {
      this.durationTxt = temValue;
      this.sortCalls();
    }
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
        && (this.txtNumber == "" || c.phone.indexOf(this.txtNumber) != -1 || c.titleClient.indexOf(this.txtNumber) != -1)
        && (this.durationTxt == -1 || c.durations == this.durationTxt));
      let newItem: AcceptManager = {
        id: item.id,
        login: item.login,
        phone: item.phone,
        callsDate: colleCallsDate
      }
      this.acceptManagers.push(newItem);
    });
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
      console.log(this.acceptManagers);
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
    console.log(element.contactType);
    if (element.contactType == 50) {
      return "#E0F8EC";
    }
    if (element.callsComments) {
        if (element.callsComments.acceptControlerCalss == 2) {
          return element.callsComments.colorPen;
        }
        else if (element.callsComments.acceptControlerCalss == 1) {
          return "#DF013A";
        }
        else {
          return "#FAFAFA";
        }
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
