import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IClient } from '../models/client.model';


@Injectable()
export class ClientsService {

    testData = JSON.stringify([
        { id: 1, title: 'Клиент 1', type: 10, numberOfCalls: 10, numberOfShipments: 10, managerId: 1 },
        { id: 2, title: 'Клиент 2', type: 30, numberOfCalls: 30, numberOfShipments: 20, managerId: 1 },
        { id: 3, title: 'Клиент 3', type: 40, numberOfCalls: 40, numberOfShipments: 30, managerId: 1 },
    ]);

    getClients(managerId: number): Observable<IClient[]>{
        const result = JSON.parse(this.testData);
        return of(result);
    }

    createClient(client: IClient): Observable<IClient> {
        let clients: IClient[] = JSON.parse(this.testData);

        client.id = clients.length + 1;

        clients = [...clients, client];

        this.testData = JSON.stringify(clients);

        return of(client);
    }

    editClient(client: IClient) {
        let clients: IClient[] = JSON.parse(this.testData);

    }


    constructor(public http: HttpClient){}
}