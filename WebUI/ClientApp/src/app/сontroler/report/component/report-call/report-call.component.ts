import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IManager } from '../../../../admin/managers/shared/models/manager.model';
import { IWorkgroup } from '../../../../admin/workgroups/shared/models/workgroup.model';
import { async } from 'q';
import { debug } from 'util';

@Component({
  selector: 'app-report-call',
  templateUrl: './report-call.component.html',
  styleUrls: ['./report-call.component.sass']
})
export class ReportCallComponent implements OnInit {


  @Input() managers: IManager[] = [];
  @Input() clientAcceptFull: ClientAccept[] = [];
  @Input() workgroup: IWorkgroup[] = [];

  calendarHidden: string = "hidden";
    btnDate: string = new Date().toLocaleDateString();
    dateStart: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 10);
    dateEnd: Date = new Date();
    btnDate1: string = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
  durationTxt: number = -1;
  manager: number = 0;
  statistickCallModel: any[] = [];
  numberYear: number = new Date().getFullYear();
  numberMonthe: number = new Date().getMonth();
  numberWeek: number = 1;
  dateCollections: string[] = [];
  dateCollection: string;

    todayLoad: boolean = false;
    toWeekLoad: boolean = false;
    toMontheLoad: boolean = false;
    toPeriodLoad: boolean = false;
    hiddenloader = "hidden";

    getWorkGroup() {
        this.hiddenloader = "";
        this.http.get<IWorkgroup[]>('api/admin/WorkGroup').subscribe((data: IWorkgroup[]) => {
            this.workgroup = data;
            this.sortCall();
        });
    }


    sortCall() {

        this.hiddenloader = "";
      this.statistickCallModel = [];
      this.http.get<any[]>('api/conroler/ClientAccept/StatistickCall?dayData=' + this.btnDate + "&year=" + this.numberYear + "&monthe=" + this.numberMonthe + "&week=" + this.numberWeek
          + "&startDate=" + this.dateStart.toLocaleDateString() + "&endDate=" + this.dateEnd.toLocaleDateString()).subscribe(async (data: any[]) => {
              this.statistickCallModel = data;
              console.log(this.statistickCallModel);
        
          this.cdr.detectChanges();
          this.initDateArchiv();
          this.hiddenloader = "hidden";
      });
    console.log(this.statistickCallModel);
  }

  changeManager(manager) {
     
  }

    weekChnege() {
        this.sortCall();
    }

    sortDateCall(numberSort: number) {
        this.calendarHidden = "hidden"
        let date: Date[] = [];
        if (numberSort == 1) {
            date.push(new Date(2019, 7, 1));
            date.push(new Date());
            this.verifyRange1(date)
        }
        else if (numberSort == 2) {
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0));
            this.verifyRange1(date)
        }
        else if (numberSort == 3) {
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 0));
            this.verifyRange1(date)
        }
        else if (numberSort == 4) {
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7, 0));
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0));
            this.verifyRange1(date)
        }
        else if (numberSort == 5) {
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30, 0));
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0));
            this.verifyRange1(date)
        }
        else if (numberSort == 6) {
            var curr = new Date;
            var first = curr.getDate() - curr.getDay() + 1;
            var last = first + 6;
            var firstday = new Date(curr.setDate(first));
            var lastday = new Date(curr.setDate(last));
            date.push(new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate(), 0));
            date.push(new Date(lastday.getFullYear(), lastday.getMonth(), lastday.getDate(), 0));
            this.verifyRange1(date)
        }
        else if (numberSort == 7) {
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0));
            date.push(new Date(new Date().getFullYear(), new Date().getMonth(), 31, 0));
            this.verifyRange1(date)
        }
        else if (numberSort == 8) {
            date.push(new Date(new Date().getFullYear(), 0, 1, 0));
            date.push(new Date(new Date().getFullYear(), 11, 31, 0));
            this.verifyRange1(date)
        }
        this.sortCall();
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
    this.sortCall();
  }

  verifyRange($event) {
      this.btnDate = $event.currentTarget.value;
      this.sortCall();
    }

    verifyRange1(dates: Date[]) {
        if (dates && dates.length != 0) {
            this.dateStart = dates[0];
            this.dateEnd = dates[dates.length - 1];
            this.btnDate1 = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
            
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

  initDateArchiv() {
    if (this.dateCollections.length == 0) {
      this.dateCollections = [];
      let firstDate = new Date();
      for (let i = 0; i < this.clientAcceptFull.length; i++) {
        let tmpDate = this.clientAcceptFull[i].date.split(".");
        if (firstDate > new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0])) {
          firstDate = new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]);
        }
      }
      for (let i = firstDate.getFullYear(); i <= new Date().getFullYear(); i++) {
        for (let j = firstDate.getMonth(); j <= new Date().getMonth(); j++) {
          let date = new Date(i + "/0" + (j + 1));
          this.dateCollections.unshift(new Date(i + "/0" + (j + 1)).toLocaleDateString().substring(3, date.toLocaleDateString().length));
        }
      }
      this.dateCollection = this.dateCollections[0];
    }
  }

  toFormatDate(dateSelect) {
    let partDate = dateSelect.split('.');
    let date = new Date(partDate[1] + "/" + partDate[0]);
    this.numberMonthe = date.getMonth();
      this.numberYear = date.getFullYear();
      this.toMontheLoad = true;
      window.setTimeout(() => {
          this.toMontheLoad = false;
      }, 700);
  
    //this.setSortWeeplan();
  }

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
    });
  }

    getPeriudWeek() {
        let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
        let first = (curr.getDate() - curr.getDay()) + 1;
        let last = first + 6;
        let firstday = new Date(curr.setDate(first));
        let lastday = new Date(curr.setDate(last));
        return firstday.toLocaleDateString() + ' - ' + lastday.toLocaleDateString()
    }


    constructor(private cdr: ChangeDetectorRef,
                public dialog: MatDialog,
                private http: HttpClient) {
    this.getManager();
    this.getWorkGroup();
  }

  ngOnInit() {
    this.btnDate = new Date().toLocaleDateString()
    let spl = this.btnDate.split('.');
    this.btnDate = spl[2] + "-" + spl[1] + "-" + spl[0];
  }

}
