import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService} from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PollCardComponent } from './poll-card/poll-card.component';
import { VoteComponent } from './vote/vote.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    PollCardComponent,
    VoteComponent,
    UserManagementComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule,
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [ AuthService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
