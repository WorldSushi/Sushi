import { Component, OnInit, Input } from '@angular/core';
import { IWorkgroup } from '../../shared/models/workgroup.model';

@Component({
  selector: 'app-workgroups-list',
  templateUrl: './workgroups-list.component.html',
  styleUrls: ['./workgroups-list.component.sass']
})
export class WorkgroupsListComponent implements OnInit {

  @Input() workgroups: IWorkgroup[];

  constructor() { }

  ngOnInit() {
  }

}
