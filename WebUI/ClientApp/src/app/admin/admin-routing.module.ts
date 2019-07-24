import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClientsComponent } from './clients/containers/clients/clients.component';
import { ManagersComponent } from './managers/containers/managers/managers.component';
import { WorkgroupsComponent } from './workgroups/containers/workgroups/workgroups.component';
import { WorkgroupsCallsComponent } from './workgroups/containers/workgroups-calls/workgroups-calls.component';
import { WorkgroupPlansComponent } from './workgroups/containers/workgroups-plans/workgroup-plans.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const adminRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clients' },
  { path: 'clients', component: ClientsComponent },
  { path: 'managers', component: ManagersComponent },
  { path: 'workgroups', component: WorkgroupsComponent },
  { path: 'workgroups/calls/:id', component: WorkgroupsCallsComponent },
  { path: 'workgroups/plans/:id', component: WorkgroupPlansComponent }
]

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AdminGuard], children: adminRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
