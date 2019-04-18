import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'manager', loadChildren: './manager/manager.module#ManagerModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
