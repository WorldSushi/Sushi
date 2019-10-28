import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IManager } from '../../../admin/managers/shared/models/manager.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IClient } from '../../../manager-rm/clients/shared/models/client.model';
import { IWorkgroup } from '../../../admin/workgroups/shared/models/workgroup.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-accept.component.html',
  styleUrls: ['./client-accept.component.sass']
})
export class ClientAcceptComponent implements OnInit {

  @Input() managers: IManager[] = [];
  @Input() clietsFull: IClient[] = [];
  @Input() workgroups: IWorkgroup[] = [];

  displayedColumns: string[] = ['status', 'title', 'clientType', 'phone', 'legalEntity', 'numberOfCalls', 'numberOfShipments', 'comentCon', 'comentCli']
  workgroupId: number = 0;
  cliets: IClient[] = [];

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
    });
  }

  setBagroundStatus(element) {
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

  setNoAccept($event, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    if (comentControler != undefined || comentControler != "") {
      this.http.get('api/conroler/ClientAccept/NoAcceptCallClient?comment=' + comentControler + "&clientId=" + clientId).subscribe();
      $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#DF013A";
    }
  }

  setAccept($event, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    this.http.get('api/conroler/ClientAccept/DefaultCallClient?comment=' + comentControler + "&clientId=" + clientId).subscribe();
    $event.currentTarget.offsetParent.children[0].value = "";
    $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#FAFAFA";
  }

  getClients() {
    this.http.get<IClient[]>('api/conroler/ClientAccept/Clients').subscribe((data: IClient[]) => {
      this.clietsFull = data;
      this.getworkgroup();
    });
  }

  getworkgroup() {
    this.http.get<IWorkgroup[]>('api/admin/WorkGroup').subscribe((data: IWorkgroup[]) => {
      this.workgroups = data
      this.sortClients();
    });
  }

  sortClients() {
    if (this.workgroupId != 0) {
      let clientIds: number[] = this.workgroups.find(w => w.id == this.workgroupId).clientIds
      this.cliets = this.clietsFull.filter(c => this.workgroupId == 0 || clientIds.indexOf(c.id) != -1);
    }
    else {
      this.cliets = this.clietsFull;
    }
    console.log("sortClients");
  }


  selectedWorkGroupChange() {
    this.sortClients();
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.getManager();
    this.getClients();
  }

  ngOnInit() {
  }

}
