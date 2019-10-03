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


  displayedColumns: string[] = ['title', 'phone1', 'contactName', 'focusProducts'];

  getReachOutcomes() {
    this.http.get<ReachOutcomes[]>('api/manager/ReachOutcomes/').subscribe((data: ReachOutcomes[]) => {
      this.reachOutcomess = data;
      console.log(data);
      this.cdr.detectChanges();
    });

  }

  addFocusProduct(element, clientId) {
    this.http.get('api/manager/ReachOutcomes/AddFocusProduct?idClient=' + clientId + '&strfocusProduct=' + element.target.value).subscribe();
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
