import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: 'controler', loadChildren: './сontroler/controler.module#ControlerModule' },
  { path: 'manager-rm', loadChildren: './manager-rm/manager-rm.module#ManagerRmModule' },
  { path: 'manager-any', loadChildren: './manager-any/manager-any.module#ManagerAnyModule' },
  { path: 'admin',  loadChildren: './admin/admin.module#AdminModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
