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
                fact: 0.3,
                clientId: 1
            },
            nomenclatureAnalysis: {
                id: 1,
                reportPrevMonth: "127%",
                reportAvg5Months: "72%",
                prevMonth: "152%",
                avg5Months: "60%",
                clientId: 1
            },
            revenueAnalysis: {
                id: 1,
                reportPrevMonth: "127%",
                reportAvg5Months: "112%",
                prevMonth: "132%",
                avg5Months: "140%",
                clientId: 1
            },
            weekPlans: [
                {
                    id: 1,
                    clientId: 1,
                    MSplanned: 'МС План 1',
                    RMplanned: 'РМ План 1',
                    MSfact: 'МС План 1',
                    RMfact: 'РМ План 1'
                },
                {
                    id: 2,
                    clientId: 1,
                    MSplanned: 'МС План 2',
                    RMplanned: 'РМ План 2',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 3,
                    clientId: 1,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 4,
                    clientId: 1,
                    MSplanned: 'МС План 4 неделя',
                    RMplanned: 'РМ План 4 неделя',
                    MSfact: 'МС факт 4 неделя',
                    RMfact: 'РМ факт 4 неделя'
                },
                {
                    id: 5,
                    clientId: 1,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                }
            ],
            MSresults: {
                id: 1,
                clientId: 1,
                calls: 1,
                whatsUp: 5,
                letters: 1              
            },
            RMresults: {
                id: 1,
                clientId: 1,
                calls: 2,
                whatsUp: 3,
                letters: 1   
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
                fact: 1,
                clientId: 2
            },
            nomenclatureAnalysis: {
                id: 2,
                reportPrevMonth: "12%",
                reportAvg5Months: "19%",
                prevMonth: "10%",
                avg5Months: "10%",
                clientId: 2
            },
            revenueAnalysis: {
                id: 2,
                reportPrevMonth: "12%",
                reportAvg5Months: "19%",
                prevMonth: "10%",
                avg5Months: "60%",
                clientId: 2
            },
            weekPlans: [
                {
                    id: 6,
                    clientId: 2,
                    MSplanned: 'План 2',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 7,
                    clientId: 2,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 8,
                    clientId: 2,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 9,
                    clientId: 2,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 10,
                    clientId: 2,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                }
            ],
            MSresults: {
                id: 2,
                clientId: 2,
                calls: 1,
                whatsUp: 5,
                letters: 1              
            },
            RMresults: {
                id: 2,
                clientId: 2,
                calls: 2,
                whatsUp: 3,
                letters: 1   
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
                fact: 0.5,
                clientId: 3
            },
            nomenclatureAnalysis: {
                id: 3,
                reportPrevMonth: "82%",
                reportAvg5Months: "59%",
                prevMonth: "90%",
                avg5Months: "126%",
                clientId: 3
            },
            revenueAnalysis: {
                id: 3,
                reportPrevMonth: "82%",
                reportAvg5Months: "29%",
                prevMonth: "30%",
                avg5Months: "126%",
                clientId: 3
            },
            weekPlans: [
                {
                    id: 11,
                    clientId: 3,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 12,
                    clientId: 3,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 13,
                    clientId: 3,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 14,
                    clientId: 3,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                },
                {
                    id: 15,
                    clientId: 3,
                    MSplanned: '',
                    RMplanned: '',
                    MSfact: '',
                    RMfact: ''
                }
            ],
            MSresults: {
                id: 3,
                clientId: 3,
                calls: 1,
                whatsUp: 5,
                letters: 1              
            },
            RMresults: {
                id: 3,
                clientId: 3,
                calls: 2,
                whatsUp: 3,
                letters: 1   
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