import { Component, OnInit, Input } from '@angular/core';
import { IManager } from '../../shared/models/manager.model';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.sass']
})
export class ManagersListComponent implements OnInit {

  @Input() managers: IManager[];

  displayedColumns: string[] = ['login', 'password', 'phone']

  constructor() { }

  ngOnInit() {
  }

}
