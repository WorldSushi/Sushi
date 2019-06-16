import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerRMComponent } from './manager-rm.component';
import { ClientsComponent } from './clients/containers/clients/clients.component';

const managerRmRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clients' },
    { path: 'clients', component: ClientsComponent }
]

const routes: Routes = [
    { path: '', component: ManagerRMComponent, children: managerRmRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRmRoutingModule { }
