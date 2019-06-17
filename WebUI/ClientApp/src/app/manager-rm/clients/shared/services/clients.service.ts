import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IClient } from '../models/client.model';


@Injectable()
export class ClientsService {

    testData = JSON.stringify([
        {   
            id: 1, 
            title: 'Клиент 1', 
            type: 10, 
            numberOfCalls: 60, 
            numberOfShipments: 10, 
            managerId: 1,
            callPlan: {
                id: 1,
                collective: 6,
                MS: 4,
                RM: 2,
                clientId: 1
            },
            tripPlan: {
                id: 1,
                planned: 10,
                fact: 10,
                clientId: 1
            }
        },
        { 
            id: 2, 
            title: 'Клиент 2', 
            type: 30, 
            numberOfCalls: 90,
            numberOfShipments: 20, 
            managerId: 1,
            callPlan: {
                id: 2,
                collective: 8,
                MS: 4,
                RM: 4,
                clientId: 2
            },
            tripPlan: {
                id: 2,
                planned: 7,
                fact: 5,
                clientId: 2
            }
        },
        { 
            id: 3, 
            title: 'Клиент 3', 
            type: 40, 
            numberOfCalls: 40, 
            numberOfShipments: 30, 
            managerId: 1,
            callPlan: {
                id: 3,
                collective: 4,
                MS: 2,
                RM: 2,
                clientId: 3
            },
            tripPlan: {
                id: 3,
                planned: 6,
                fact: 5,
                clientId: 3
            }
        },
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

    editClient(client: IClient): Observable<IClient> {
        let clients: IClient[] = JSON.parse(this.testData);

        let indexOfEditingClient = clients.findIndex(item => item.id == client.id);

        clients = [
            ...clients.slice(0, indexOfEditingClient),
            client,
            ...clients.slice(indexOfEditingClient + 1)
        ];

        this.testData = JSON.stringify(clients);

        return of(client);
    }


    constructor(public http: HttpClient){}
}