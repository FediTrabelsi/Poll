import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class PollServicesService {
 key : "thisismykickasssecretthatiwilltotallychangelater"
  constructor(private http: HttpClient) { }

  getMyPolls(){
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    const id = decoded.id;
    console.log(decoded);
    return this.http.get('http://localhost:3000/polls/my',{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
    });
  }

  getPolls(){
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    const id = decoded.id;
    console.log(decoded);
    return this.http.get('http://localhost:3000/polls/',{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
    });
  }

  vote(id,answer){
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    let httpParams = new HttpParams();
      httpParams = httpParams.append('answer',answer);
    
    return this.http.post('http://localhost:3000/polls/vote/'+id, httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
    });
  }



  delete(id){
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    
    return this.http.delete('http://localhost:3000/polls/'+id,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
    });
  }


  createPoll(data){
    const token = localStorage.getItem('token')

    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:3000/polls', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
    });
  }
}
