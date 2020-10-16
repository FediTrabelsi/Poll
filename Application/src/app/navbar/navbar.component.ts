import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `
  ]
})

export class NavbarComponent implements OnInit {
  isAdmin$: Observable<boolean>; ;
  isLoggedIn$: Observable<boolean>;  
  constructor( private authService : AuthService) { }

  ngOnInit() {
   
    this.isLoggedIn$=this.authService.isLoggedIn
    this.isAdmin$=this.authService.isAdmin
    console.log(this.isLoggedIn$['value'])
  }

  logout(){
    this.authService.logout()
  }

}
