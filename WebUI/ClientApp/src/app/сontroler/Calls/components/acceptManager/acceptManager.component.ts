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



  ngOnChanges() {
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
      this.cdr.detectChanges();
    });

  }

  getcallsDater() {
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe((data: ClientAccept[]) => {
      this.cientAccept = data;
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

}
