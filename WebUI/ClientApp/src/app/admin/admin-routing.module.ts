import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClientsComponent } from './clients/containers/clients/clients.component';
import { ManagersComponent } from './managers/containers/managers/managers.component';

const adminRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clients' },
  { path: 'clients', component: ClientsComponent },
  { path: 'managers', component: ManagersComponent }
]

const routes: Routes = [
  { path: '', component: AdminComponent, children: adminRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
