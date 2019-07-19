import { Component, OnInit, Input } from '@angular/core';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {
  @Input() clients: IClient[];

  displayedColumns: string[] = ['title', 'clientType', 'phone', 'numberOfCalls', 'numberOfShipments']

  openEditClientForm(){

  }

  constructor() { }

  ngOnInit() {
  }

}
