import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IManager } from '../../../admin/managers/shared/models/manager.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IClient } from '../../../manager-rm/clients/shared/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-accept.component.html',
  styleUrls: ['./client-accept.component.sass']
})
export class ClientAcceptComponent implements OnInit {

  @Input() managers: IManager[] = [];
  @Input() cliets: IClient[] = [];

  displayedColumns: string[] = ['status', 'title', 'clientType', 'phone', 'legalEntity', 'numberOfCalls', 'numberOfShipments', 'comentCon', 'comentCli']

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
    });
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
      this.cliets = data;
    });
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
