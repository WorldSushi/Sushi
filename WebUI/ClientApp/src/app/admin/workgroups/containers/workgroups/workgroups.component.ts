import { Component, OnInit } from '@angular/core';
import { WorkgroupsFacade } from 'src/app/store/workgroups/facades/workgroup.facade';
import { Observable } from 'rxjs';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { ManagersFacade } from 'src/app/store/managers/facades/manager.facade';

@Component({
  selector: 'app-workgroups',
  templateUrl: './workgroups.component.html',
  styleUrls: ['./workgroups.component.sass']
})
export class WorkgroupsComponent implements OnInit {

  workgroups$: Observable<IWorkgroup[]> = this.workgroupsFacade.workgroups$;

  constructor(public workgroupsFacade: WorkgroupsFacade,
    public managersFacade: ManagersFacade) { }

  ngOnInit() {
    this.workgroupsFacade.loadWorkgroups();
    this.managersFacade.loadManagers();
  }

}
