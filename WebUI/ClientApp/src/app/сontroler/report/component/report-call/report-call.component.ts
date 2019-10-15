import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IManager } from '../../../../admin/managers/shared/models/manager.model';

@Component({
  selector: 'app-report-call',
  templateUrl: './report-call.component.html',
  styleUrls: ['./report-call.component.sass']
})
export class ReportCallComponent implements OnInit {


  @Input() managers: IManager[] = [];
  @Input() clientAcceptFull: ClientAccept[] = [];

  calendarHidden: string = "hidden";
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  btnDate: string = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
  durationTxt: number = -1;
  manager: number = 0;

  getcallsDater() {
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe((data: ClientAccept[]) => {
      this.clientAcceptFull = data;
      console.log(this.clientAcceptFull);
      this.cdr.detectChanges();
    });
  }

  changeManager(manager) {
     
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
    }
  }

  verifyRange(dates: Date[]) {
    if (dates && dates.length != 0) {
      this.dateStart = dates[0];
      this.dateEnd = dates[dates.length - 1];
      this.btnDate = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
    }
  }

  hiddenCalendar() {
    if (this.calendarHidden == "hidden") {
      this.calendarHidden = "";
    }
    else {
      this.calendarHidden = "hidden";
    }
  }

  getAllCall() {
    return this.clientAcceptFull.filter(c => new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllIncoming() {
    return this.clientAcceptFull.filter(c => c.direction == "Входящий" 
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllOutgoing() {
    return this.clientAcceptFull.filter(c => c.direction == "Исходящий"
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllYes() {
    return this.clientAcceptFull.filter(c => c.durations != 0 
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllYesIncoming() {
    return this.clientAcceptFull.filter(c => c.durations != 0 && c.direction == "Входящий" 
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllYesOutgoing() {
    return this.clientAcceptFull.filter(c => c.durations != 0 && c.direction == "Исходящий"
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllNo() {
    return this.clientAcceptFull.filter(c => c.durations == 0
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllYNoIncoming() {
    return this.clientAcceptFull.filter(c => c.durations == 0 && c.direction == "Входящий"
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllNoOutgoing() {
    return this.clientAcceptFull.filter(c => c.durations == 0 && c.direction == "Исходящий"
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations)).length;
  }

  getAllCallDurationsOutgoing() {
    let fullDuration = 0;
    let clintCalls = this.clientAcceptFull.filter(c => c.direction == "Исходящий"
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations));
    clintCalls.forEach((item) => {
      fullDuration += item.durations;
    });
    return fullDuration;
  }

  getAllCallDurationsIncoming() {
    let fullDuration = 0;
    let clintCalls = this.clientAcceptFull.filter(c => c.direction == "Входящий"
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations));
    clintCalls.forEach((item) => {
      fullDuration += item.durations;
    });
    return fullDuration;
  }

  getAllCallDurations() {
    let fullDuration = 0;
    let clintCalls = this.clientAcceptFull.filter(c => new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) >= this.dateStart
      && new Date(c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '/' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0]) <= this.dateEnd
      && (this.manager == 0 || this.manager == c.managerId)
      && (this.durationTxt == -1 || this.durationTxt == c.durations));
    clintCalls.forEach((item) => {
      fullDuration += item.durations;
    });
    return fullDuration;
  }

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
      this.cdr.detectChanges();
    });
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.getcallsDater();
    this.getManager();
  }

  ngOnInit() {
  }

}
