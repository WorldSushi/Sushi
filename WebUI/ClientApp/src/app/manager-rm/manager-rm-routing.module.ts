import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerRMComponent } from './manager-rm.component';
import { ClientsComponent } from './clients/containers/clients/clients.component';
import { DashboardComponent } from './dashboard/containers/dashboard/dashboard.component';
import { ReachOutcomesComponent } from './reach-outcomes/components/reach-outcomes/reach-outcomes.component';

const managerRmRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clients' },
    { path: 'clients', component: ClientsComponent },
    { path: 'dashboard', component: DashboardComponent },
  { path: 'ReachOutcomes', component: ReachOutcomesComponent }
]

const routes: Routes = [
    { path: '', component: ManagerRMComponent, children: managerRmRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRmRoutingModule { }
