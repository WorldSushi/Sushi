import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ReachOutcomes } from '../../Model/reach-outcomes.model';

@Component({
  selector: 'app-company-birthday',
  templateUrl: './reach-outcomes.component.html',
  styleUrls: ['./reach-outcomes.component.sass']
})
export class ReachOutcomesComponent implements OnInit {

  reachOutcomess: ReachOutcomes[];


  displayedColumns: string[] = ['title', 'phone1', 'resume1', 'resume2']

  getReachOutcomes() {
    this.http.get<ReachOutcomes[]>('api/manager/ReachOutcomes/').subscribe((data: ReachOutcomes[]) => {
      this.reachOutcomess = data;
      console.log(data);
      this.cdr.detectChanges();
    });

  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getReachOutcomes();
  }

}
