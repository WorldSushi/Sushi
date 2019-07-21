import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from 'src/app/store/clients/facades/clients.facade';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  
  clients$: Observable<IClient[]> = this.clientsFacade.clients$;

  createClient(client: IClient){
    this.clientsFacade.adminCreateClient(client);
  }

  updateClient(client: IClient){
    this.clientsFacade.adminEditClient(client);
  }
  

  constructor(public clientsFacade: ClientsFacade) { }

  ngOnInit() {
    this.clientsFacade.loadClientsForAdmin();
  }

}
