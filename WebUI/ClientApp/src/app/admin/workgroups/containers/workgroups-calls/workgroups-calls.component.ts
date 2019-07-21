import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, pipe, of } from 'rxjs';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { ClientsFacade } from 'src/app/store/clients/facades/clients.facade';
import { WorkgroupsFacade } from 'src/app/store/workgroups/facades/workgroup.facade';
import { CallsDateFacade } from 'src/app/store/clients/facades/calls-date.selectors';
import { ActivatedRoute } from '@angular/router';
import { switchMap, combineLatest, map, take, mergeMap, concatAll, concatMap, withLatestFrom } from 'rxjs/operators';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { IWorkgroupCalls } from '../../shared/models/workgroup-calls.model';
import { ManagersFacade } from 'src/app/store/managers/facades/manager.facade';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

@Component({
  selector: 'app-workgroups-calls',
  templateUrl: './workgroups-calls.component.html',
  styleUrls: ['./workgroups-calls.component.sass']
})
export class WorkgroupsCallsComponent implements OnInit {
  workgroupId: any;

  clients$: Observable<IClient[]> = this.clientsFacade.clients$;
  calls$: Observable<ICallsDate[]> = this.callsFacade.callsDate$;
  workgroups$: Observable<IWorkgroup[]> = this.workgroupsFacade.workgroups$;
  managers$: Observable<IManager[]> = this.managersFacade.managers$;

  workgroupsCalls$: Observable<IWorkgroupCalls[]>;


  constructor(public clientsFacade: ClientsFacade,
    public workgroupsFacade: WorkgroupsFacade,
    public callsFacade: CallsDateFacade,
    public managersFacade: ManagersFacade,
    public route: ActivatedRoute) {
      
      this.route.paramMap.pipe(
        switchMap(params => params.get('id'))
      )
      .subscribe(res => this.workgroupId = res)
    }

  ngOnInit() {
    this.clientsFacade.loadClientsForAdmin();
    this.callsFacade.loadCallsDate(0);

    this.workgroupsCalls$ = this.clients$.pipe(
      withLatestFrom(this.calls$),
      map(([clients, calls]) => {
        return clients.map(client => {
          return {
            clientId: client.id,
            clientTitle: client.title,
            clientType: client.clientType,
            clientActions: calls.filter(call => call.clientId == client.id)           
              
          }
        })
      }),
      withLatestFrom(this.workgroups$),
      map(([workgroupsCalls, workgroups]) => {
        const currentWorkgroup = workgroups.find(workgroup => workgroup.id == this.workgroupId);

        return workgroupsCalls.filter(workgroupCalls => currentWorkgroup.clientIds.some(clientId => clientId == workgroupCalls.clientId))
      })

    )
  


    
  }

}
