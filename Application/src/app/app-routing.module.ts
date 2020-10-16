import { UserManagementComponent } from './user-management/user-management.component';
import { VoteComponent } from './vote/vote.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule ,CanActivate} from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent,
  canActivate: [AuthGuard]},
  {path: 'vote', component: VoteComponent,
  canActivate: [AuthGuard]},
  {path: 'users', component: UserManagementComponent,
  canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
