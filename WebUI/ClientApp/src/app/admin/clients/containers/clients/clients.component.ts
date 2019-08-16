import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from 'src/app/store/clients/facades/clients.facade';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  
  clients$: Observable<IClient[]> = this.clientsFacade.clients$.pipe(
    map(res => {
      let actualData = res.filter(item => item.group > 0);
      let undefinedData = res.filter(item => item.group == 0);
  
      actualData = actualData.sort((a, b) => a.group < b.group ? -1 : 1);
  
      return [...actualData, ...undefinedData];
    })
  );

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
