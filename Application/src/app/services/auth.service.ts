import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false) ;
  isAnAdmin = new BehaviorSubject<boolean>(false) ;

  authToken;
 
  constructor(  private http: HttpClient , public router: Router) {}
  




  RegisterUser(user){
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function (key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post('http://localhost:3000/users', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  AuthentificateUser(user){
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function (key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post('http://localhost:3000/auth', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token!==null){
      var decoded = jwt_decode(token);
    const role = decoded.role;
    if( role==='admin'){
      this.isAnAdmin.next(true)
      this.loggedIn.next(true);
      return true
    }else{
      this.isAnAdmin.next(false)
      this.loggedIn.next(true);
      return true
    }
      

    }
    else{this.loggedIn.next(false)
        return false;}
  }

  public isAuthenticatedAsAdmin(): boolean {
    const token = localStorage.getItem('token');
    if(token!==null){
      var decoded = jwt_decode(token);
    const role = decoded.role;
    if( role==='admin'){
      this.isAnAdmin.next(true)
      this.loggedIn.next(true);
      return true
    }else{
      this.isAnAdmin.next(false)
      this.loggedIn.next(true);
      return false
    }
      

    }
    else{this.loggedIn.next(false)
        return false;}
  }

   

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
    }
  get isAdmin(){
    return this.isAnAdmin.asObservable();
  }

  nextTrue(){
    this.loggedIn.next(true)

  }
  logout(){
    localStorage.removeItem('token')
    
    this.loggedIn.next(false)
    console.log(this.loggedIn)
    this.router.navigate(['login'])
  }
}
