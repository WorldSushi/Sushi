import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IClient } from '../../shared/models/client.model';
import { MatDialog } from '@angular/material';
import { CreateClientDialogComponent } from '../../dialogs/create-client-dialog/create-client-dialog.component';
import { EditClientDialogComponent } from '../../dialogs/edit-client-dialog/edit-client-dialog.component';
import { AnalysisDialogComponent } from '../../dialogs/analysis-dialog/analysis-dialog.component';
import { INomenclatureAnalysis } from '../../shared/models/nomenclature-analysis';
import { IRevenueAnalysis } from '../../shared/models/revenue-analysis';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @Input() clients: IClient[];

  @Output() clientCreated: EventEmitter<IClient> = new EventEmitter<IClient>();
  @Output() clientUpdated: EventEmitter<IClient> = new EventEmitter<IClient>();
   
  displayedColumns: string[] = [
    'id', 
    'title', 
    'type', 
    'numberOfCalls', 
    'numberOfShipments',
    'nomenclatureAnalysis',
    'revenueAnalysis', 
    'callPlan.collective', 
    'callPlan.MS', 
    'callPlan.RM',
    'tripPlan.planned',
    'tripPlan.fact'
  ];

  openCreateClientForm() {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: '725px'
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.clientCreated.emit(res);
      }
    })
  }

  openEditClientForm(client: IClient) {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      width: '725px',
      data: { ...client }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.updateClient(res);
      }
    })
  }

  updateClient(client: IClient) {
    this.clientUpdated.emit(client);
  }

  openNomenclatureAnalysis(client: IClient) {
    this.dialog.open(AnalysisDialogComponent, {
      width: '725px',
      data: {
        title: client.title,
        analysisTitle: 'Анализ по номен-ре',
        analysis: [client.nomenclatureAnalysis]
      }
    })
  }

  openRevenueAnalysis(client: IClient) {
    this.dialog.open(AnalysisDialogComponent, {
      width: '725px',
      data: {
        title: client.title,
        analysisTitle: 'Анализ по выручке',
        analysis: [client.revenueAnalysis]
      }
    })
  }

  getAvgAnalysis(value: INomenclatureAnalysis | IRevenueAnalysis){
    const a = parseInt(value.reportPrevMonth);
    const b = parseInt(value.reportAvg5Months);
    const c = parseInt(value.prevMonth);
    const d = parseInt(value.avg5Months);

    return Math.round((a + b + c + d) / 4);
  }

  getAnalysisColor(value) {
    if(value == 0){
      return "#ac0800"
    }
    else if(value > 0 && value < 25){
      return '#fb8c00'
    }
    else if(value >= 25 && value <= 49){
      return '#ffd54f'
    }
    else if(value > 49 && value <= 74){
      return '#f8bbd0'
    }
    else if(value > 74 && value <= 99){
      return '#64dd17'
    }
    else if(value > 99 && value <= 124){
      return '#4caf50'
    }
    else if(value > 124){
      return '#18ffff'
    }
    else {
      '#fff'
    }
  }
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
