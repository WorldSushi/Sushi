  import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { CreateClientDialogComponent } from '../../dialogs/create-client-dialog/create-client-dialog.component';
import { MatDialog, MatPaginator, MatTableDataSource, Sort, MatSort } from '@angular/material';
import { EditClientDialogComponent } from '../../dialogs/edit-client-dialog/edit-client-dialog.component';
import { IWorkgroup } from '../../../workgroups/shared/models/workgroup.model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { GetWorkgroupsAction, GetWorkgroupsSuccesAction } from '../../../../store/workgroups/actions/workgroup.actions';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @Input() clients: IClient[];
  @Input() workgroup: IWorkgroup[];

  @Output() clientCreated: EventEmitter<IClient> = new EventEmitter<IClient>();
  @Output() clientUpdated: EventEmitter<IClient> = new EventEmitter<IClient>();


  //actualLength: number;
  actual: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);
  
  //recordShipmentLength: number;
  recordShipment: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //restaurantsLength: number;
  restaurants: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //newOrResuscitatingLength: number;
  newOrResuscitating: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //notDeterminedLength: number;
  notDetermined: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //notDeterminedLength: number;
  other: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  selectedGroup: any = -10;

  displayedColumns: string[] = ['title', 'clientType', 'phone', 'legalEntity', 'numberOfCalls', 'numberOfShipments']

  hidenDivFull = false;
  hidenDivSrrch = true;

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

  getClientsGroups(){
    let allGroups = this.clients.map(item => item.group);
    console.log(allGroups);
    let result = [...new Set(allGroups)];
    console.log(result);
    return result;
  }

  clientsTmp: IClient[] = [];
  clientsTmp1: IClient[] = [];
  selectedWorkGroupChange() {
    if (this.selectedGroup == -10) {
      this.hidenDivFull = false;
      this.hidenDivSrrch = true;
    }
    else {
      this.clientsTmp = [];
      this.clientsTmp1 = [];
      for (let i = 0; i < this.workgroup[this.selectedGroup].clientIds.length; i++) {
        this.clientsTmp = this.clients.filter(c => c.id == this.workgroup[this.selectedGroup].clientIds[i]);
        for (let j = 0; j < this.clientsTmp.length; j++) {
          this.clientsTmp1.push(this.clientsTmp[j]);
        }
      }
      this.dataSource.data = this.clientsTmp1;
      this.dataSource.paginator = this.paginator;
      this.hidenDivFull = true;
      this.hidenDivSrrch = false;
    }
  }

  openEditClientForm(client: IClient) {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      width: '938px',
      data: { ...client }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.clientUpdated.emit(res);
      }
    })
  }

  applyFilter(filterValue: string) {
    if (filterValue != "") {
      this.hidenDivFull = true;
      this.hidenDivSrrch = false;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    else {
      this.hidenDivFull = false;
      this.hidenDivSrrch = true;
    }
  }

  getWorkgroups(){
     
  }
  

  constructor(public dialog: MatDialog, private store: Store<{ workGrupe: IWorkgroup[] }>) {
    this.store.select('workgroupR').subscribe();

    this.store.dispatch(new GetWorkgroupsAction());
    this.store.dispatch(new GetWorkgroupsSuccesAction({ workgroups: this.workgroup }));
  }

  ngOnInit() {

  }

  ngOnChanges(changes): void {
    this.actual.data = this.clients.filter(c => c.group == 10);
    this.recordShipment.data = this.clients.filter(c => c.group == 20);
    this.restaurants.data = this.clients.filter(c => c.group == 40);
    this.newOrResuscitating.data = this.clients.filter(c => c.group == 30);
    this.notDetermined.data = this.clients.filter(c => c.group == 0);
    this.other.data = this.clients.filter(c => c.group == 50);
    this.dataSource.data = this.clients;
    this.dataSource.paginator = this.paginator;
  }
}
