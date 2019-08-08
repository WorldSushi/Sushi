import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.sass']
})
export class DashboardPanelComponent implements OnInit {

  @Input() clientContactsAmount: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
