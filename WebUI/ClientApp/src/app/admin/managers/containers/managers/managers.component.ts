import { Component, OnInit } from '@angular/core';
import { ManagersFacade } from 'src/app/store/managers/facades/manager.facade';
import { Observable } from 'rxjs';
import { IManager } from '../../shared/models/manager.model';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.sass']
})
export class ManagersComponent implements OnInit {
  managers$: Observable<IManager[]> = this.managersFacade.managers$;

  constructor(public managersFacade: ManagersFacade) { }

  ngOnInit() {
    this.managersFacade.loadManagers();
  }

}
