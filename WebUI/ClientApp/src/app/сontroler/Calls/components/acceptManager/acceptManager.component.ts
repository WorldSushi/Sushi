import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { HttpClient } from '@angular/common/http';
import { AcceptManager } from '../../../../manager-rm/clients/shared/models/accept-manager.model';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { Data } from '@angular/router';
import { Component, ViewChild, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';

@Component({
  selector: 'app-Accept-Manager',
  templateUrl: './acceptManager.component.html',
  styleUrls: ['./acceptManager.component.sass']
})
export class AcceptManagerComponent implements OnInit {
  @Input() managers: IManager[] = [];
  @Input() cientAccept: ClientAccept[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  paginateDataAcept: ClientAccept[] = [];

  displayedColumns: string[] = ['status', 'statusCall', 'direction', 'title', 'phone', 'duration', 'date', 'comentCon', 'comentCli', 'refAudio']

  calendarHidden: string = "hidden";
  dateStart: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  dateEnd: Date = new Date();
  btnDate: string = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
  direction = 0;
  txtNumber = "";
  durationTxt: number = -1;
  selectedManager: number = 0;
  hiddenloader = "hidden";
  audioPlay;
  audioPlayId = 0;

  dataSource = new MatTableDataSource<ClientAccept>(this.cientAccept);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) expansionPaginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnChanges() {
  }

    getActionColor(clientAction: ClientAccept) {
        if (!clientAction.statusContact || clientAction.statusContact == 0) {
            if (clientAction.contactType == 0 || (clientAction.durations < 150 && clientAction.contactType == 10))
                return '#e5e5e5';
            else if (clientAction.contactType == 10)
                return '#FF1493'
            else if (clientAction.contactType == 20)
                return '#B0ECDD'
            else if (clientAction.contactType == 30)
                return '#FDE488'
            else if (clientAction.contactType == 40)
                return '#00FF7F'
            else if (clientAction.contactType == 60)
                return '#58FA82'
        }
        else if (clientAction.statusContact == 1) {
            return 'red'
        }
        else if (clientAction.statusContact == 2) {
            return '#A9A9F5'
        }
    }

  sortDateCall(numberSort: number) {
    this.calendarHidden = "hidden"
    let date: Date[] = [];
    if (numberSort == 1) {
      date.push(new Date(2019, 7, 1));
      date.push(new Date());
      this.verifyRange(date)
    }
    else if (numberSort == 2) {
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0));
      this.verifyRange(date)
    }
    else if (numberSort == 3) {
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 0));
      this.verifyRange(date)
    }
    else if (numberSort == 4) {
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7, 0));
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0));
      this.verifyRange(date)
    }
    else if (numberSort == 5) {
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30, 0));
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0));
      this.verifyRange(date)
    }
    else if (numberSort == 6) {
      var curr = new Date;
      var first = curr.getDate() - curr.getDay() + 1;
      var last = first + 6;
      var firstday = new Date(curr.setDate(first));
      var lastday = new Date(curr.setDate(last));
      date.push(new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate(), 0));
      date.push(new Date(lastday.getFullYear(), lastday.getMonth(), lastday.getDate(), 0));
      this.verifyRange(date)
    }
    else if (numberSort == 7) {
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0));
      date.push(new Date(new Date().getFullYear(), new Date().getMonth(), 31, 0));
      this.verifyRange(date)
    }
    else if (numberSort == 8) {
      date.push(new Date(new Date().getFullYear(), 0, 1, 0));
      date.push(new Date(new Date().getFullYear(), 11, 31, 0));
      this.verifyRange(date)
    }
  }

  applyFilterNumberOrname(filterValue: string) {
    this.txtNumber = filterValue;
    this.sortCalls();
  }

  applyFilterDuration(filterValue: string) {
    let rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    let temValue = -1;
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

  changeManager() {
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
    this.hiddenloader = "";
    let direction = this.direction == 1 ? "Исходящий" : this.direction == 2 ? "Входящий" : "";
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/AcceptManager?dateStart='
      + this.dateStart.toLocaleDateString() + '&dateEnd=' + this.dateEnd.toLocaleDateString() + '&direction=' + direction + '&txtNumber='
      + this.txtNumber + '&durationTxt=' + this.durationTxt + '&managerId=' + this.selectedManager).subscribe((data: ClientAccept[]) => {
        this.cientAccept = data;
        this.totalItems = data.length;
        this.paginateDataAcept = data.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
        this.dataSource = new MatTableDataSource<ClientAccept>(this.cientAccept)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.hiddenloader = "hidden";
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
    //this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe((data: ClientAccept[]) => {
    //  this.cientAccept = data;
    //  this.sortCalls();
    //});

    this.sortCalls();
  }

  hidenTable($event) {
    if ($event.currentTarget.children[1].hidden) {
      $event.currentTarget.children[1].hidden = false;
    }
    else {
      $event.currentTarget.children[1].hidden = true;
    }
  }

  setNoAccept($event, callId, clientId, index = null) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    if (comentControler || comentControler != "") {
      this.http.get('api/conroler/ClientAccept/NoAcceptCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();
      if (!this._isMobile()) {
        $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#DF013A";
        $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = "red";
      } else {
        const $status = document.getElementsByClassName("status")[index] as any;
        const $statusCall = document.getElementsByClassName("statusCall")[index].getElementsByClassName("action-circle")[0] as any;
        $status.style.backgroundColor = "#DF013A";
        $statusCall.style.backgroundColor = "red";
      }
    }
  }

    setAccept($event, callId, clientId, index = null) {
        const comentControler = $event.currentTarget.offsetParent.children[0].value;
        this.http.get('api/conroler/ClientAccept/DefaultCall?comment=' + comentControler + "&callId=" + callId + "&clientId=" + clientId).subscribe();

        let cientAcceptOne = this.cientAccept.find(c => c.id == callId);
        cientAcceptOne.statusContact == 0;
        let color = '';

        if (cientAcceptOne.contactType == 0 || (cientAcceptOne.durations < 150 && cientAcceptOne.contactType == 10))
            color = '#e5e5e5';
        else if (cientAcceptOne.contactType == 10)
            color = '#FF1493'
        else if (cientAcceptOne.contactType == 20)
            color = '#B0ECDD'
        else if (cientAcceptOne.contactType == 30)
            color = '#FDE488'
        else if (cientAcceptOne.contactType == 40)
            color = '#00FF7F'
        else if (cientAcceptOne.contactType == 60)
            color = '#58FA82'

        if (!this._isMobile()) {
            $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#FAFAFA";
            $event.currentTarget.offsetParent.parentElement.children[1].children[0].style.backgroundColor = color;
        } else {
            const $status = document.getElementsByClassName("status")[index] as any;
            const $statusCall = document.getElementsByClassName("statusCall")[index].getElementsByClassName("action-circle")[0] as any;

            $status.style.backgroundColor = "#FAFAFA";
            $statusCall.style.backgroundColor = color;
        }
    }

  playAudio($event, id, audioSrc) {
    if (this.audioPlayId == id || this.audioPlayId != 0 || this.audioPlay) {
      this.audioPlay.pause();
      this.audioPlay = null;
      this.audioPlayId = 0;
    }
    else {
      if (!audioSrc) {
        return;
      }

      this.audioPlay = new Audio(audioSrc);
      this.audioPlay.play();
      this.audioPlayId = id;
    }
  }

    setBagroundStatus(element) {
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


    msToTime(duration) {
        var d, h, m, s;
        s = duration;
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        h += d * 24;
        return h + ':' + m + ':' + s;
    }

  ngOnInit() {
    this.getManager();
    this.getcallsDater();
  }

  _display_audio_icon(id) {
    return this.audioPlayId == id ? '../../../../../Icon/pause.png' : '../../../../../Icon/play.png';
  }

  _filterOpened: boolean = false;

  _toggleSidebar() {
    this._filterOpened = !this._filterOpened;
  }

  _isMobile() {
    return window.innerWidth < 820;
  }

  _getFilterIcon() {
    return this._filterOpened ? 'Icon/close.png' : 'Icon/filter.png';
  }

  paginate(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.paginateDataAcept = this.cientAccept.slice(offset).slice(0, event.pageSize);
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
  }
}
