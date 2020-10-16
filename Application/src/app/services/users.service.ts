import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  key : "thisismykickasssecretthatiwilltotallychangelater"
  constructor(private http: HttpClient) { }
  
  getUsers(){
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    const id = decoded.id;
    console.log(decoded);
    return this.http.get('http://localhost:3000/users',{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
    });
  }


  delete(id){
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    
    return this.http.delete('http://localhost:3000/users/'+id,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
    });
  }

}
