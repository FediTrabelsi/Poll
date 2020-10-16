import { AuthService } from './../services/auth.service';
import {
  CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot,Router
} from '@angular/router';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {
  
  constructor(private loginservice: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):
   boolean
   {
     if (!this.loginservice.isAuthenticatedAsAdmin()) {
      this._router.navigate(['home']);
      return false;
    }
    return true;
  }
}
