import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReachOutcomes } from '../../Model/reach-outcomes.model';
import { DialogBodyComponent } from '../../Dialog/dialog-body/dialog-body.component';

@Component({
  selector: 'app-company-birthday',
  templateUrl: './reach-outcomes.component.html',
  styleUrls: ['./reach-outcomes.component.sass']
})
export class ReachOutcomesComponent implements OnInit {

  reachOutcomess: ReachOutcomes[];


  displayedColumns: string[] = ['title', 'phone1', 'contactName', 'weekPlanReg', 'weekPlanEsc', 'focusProducts'];

  getReachOutcomes() {
    this.http.get<ReachOutcomes[]>('api/manager/ReachOutcomes/').subscribe((data: ReachOutcomes[]) => {
      this.reachOutcomess = data;
      console.log(data);
      this.cdr.detectChanges();
    });

  }

  getPlanDot(weekPlanStr) {
    let weekPlan = weekPlanStr;
    if (weekPlanStr.length > 75) {
      weekPlan = weekPlan.substr(0, 75)
      weekPlan += "...";
    }
    return weekPlan;
  }

  addFocusProduct(element, clientId) {
    this.http.get('api/manager/ReachOutcomes/AddFocusProduct?idClient=' + clientId + '&strfocusProduct=' + element.target.value).subscribe();
  }

  saveChangesPhones(element, previousValue, clientId) {
    if (previousValue != element.target.value) {
      this.http.get('api/manager/ReachOutcomes/SavePhones?idClient=' + clientId + '&strPhones=' + element.target.value).subscribe();
    }
  }

  saveChangesPosition(element, previousValue, clientId) {
    if (previousValue != element.target.value) {
      this.http.get('api/manager/ReachOutcomes/SavePositions?idClient=' + clientId + '&strPositions=' + element.target.value).subscribe();
    }
  }

  OpenDialogResult(idClient) {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '1500px',
      data: this.reachOutcomess.find(r => r.clientId == idClient),
    })
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getReachOutcomes();
  }

}
