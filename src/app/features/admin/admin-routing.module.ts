import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './pages/logs/logs.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'users',
    title: 'Usuários - Unifit',
    component: UsersComponent,
  },
  {
    path: 'logs',
    title: 'Logs do Sistema - Unifit',
    component: LogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
