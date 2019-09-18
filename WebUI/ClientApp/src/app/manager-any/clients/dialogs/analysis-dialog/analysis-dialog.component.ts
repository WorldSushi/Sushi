import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.sass']
})
export class AnalysisDialogComponent implements OnInit {
  displayedColumns: string[] = ['key', 'value']
  
  getAnalysisProps(value) {
    if(value == 0){
      return {
        background: "#ac0800",
        font: "#384855",
        width: '90'
      } 
    }
    else if(value > 0 && value < 25){
      return {
        background: "#ffbc6d",
        font: "#384855",
        width: "120"
      }
    }
    else if(value >= 25 && value <= 49){
      return {
        background: "#fee789",
        font: "#384855",
        width: "150"
      }
    }
    else if(value > 49 && value <= 74){
      return {
        background: '#ebb4d3',
        font: '#384855',
        width: "210"
      }
    }
    else if(value > 74 && value <= 99){
      return {
        background: "#ccffc6",
        font: "#384855",
        width: "240"
      }
    }
    else if(value > 99 && value <= 124){
      return {
        background: "#85e5fe",
        font: "#384855",
        width: '300'
      }
    }
    else if(value > 124){
      return {
        background: "#85e5fe",
        font: "#384855",
        width: '330'
      }
    }
    else {
      '#fff'
    }
  }

  close(){
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<AnalysisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    }

  ngOnInit() {
  }

}
