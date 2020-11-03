import { ComentarioComponent } from './component/comentario/comentario.component';
import { TaskDetailComponent } from './component/task-detail/task-detail.component';
import { TaskListComponent } from './component/task-list/task-list.component';
import { TaskNewComponent } from './component/task-new/task-new.component';
import { SummaryComponent } from './component/summary/summary.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { LoginComponent } from './component/security/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './component/security/auth.guard';
import { UserNewComponent } from './component/user-new/user-new.component';

const routes: Routes = [ 
{ path: 'login', component: LoginComponent },
{ path: '', component: HomeComponent,  canActivate:[AuthGuard] },
{ path: 'novo-usuario', component: UserNewComponent,  canActivate:[AuthGuard] },
{ path: 'novo-usuario/:id', component: UserNewComponent,  canActivate:[AuthGuard] },
{ path: 'lista-usuario', component: UserListComponent,  canActivate:[AuthGuard] },
{ path: 'novo-task', component: TaskNewComponent,  canActivate:[AuthGuard] },
{ path: 'novo-task/:id', component: TaskNewComponent,  canActivate:[AuthGuard] },
{ path: 'lista-task', component: TaskListComponent,  canActivate:[AuthGuard] },
{ path: 'detail-task/:id', component: TaskDetailComponent,  canActivate:[AuthGuard] },
{ path: 'comentario-task/:id', component: ComentarioComponent,  canActivate:[AuthGuard] },
{ path: 'summary', component: SummaryComponent,  canActivate:[AuthGuard] }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
  constructor( private router: Router){
    
  }
 
 }
