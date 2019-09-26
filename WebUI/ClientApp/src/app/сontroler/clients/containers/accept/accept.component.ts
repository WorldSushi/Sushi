import { Component, OnInit } from '@angular/core';
import { ManagersFacade } from '../../../../store/managers/facades/manager.facade';
import { IManager } from '../../../../admin/managers/shared/models/manager.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.sass']
})
export class AcceptComponent implements OnInit {

  managers$: Observable<IManager[]> = this.managersFacade.managers$;


  constructor(public managersFacade: ManagersFacade) { }

  ngOnInit() {
    this.managersFacade.loadManagers();
    console.log(this.managers$);
  }

}
