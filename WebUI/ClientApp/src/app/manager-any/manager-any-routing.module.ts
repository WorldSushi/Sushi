import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerAnyComponent } from './manager-any.component';
import { ClientsComponent } from './clients/containers/clients/clients.component';

const managerAnyRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clients' },
    { path: 'clients', component: ClientsComponent },
]

const routes: Routes = [
  { path: '', component: ManagerAnyComponent, children: managerAnyRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerAnyRoutingModule { }
