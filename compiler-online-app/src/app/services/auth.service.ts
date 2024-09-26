import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginResponse } from '../Model/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server = "http://localhost:8080/api/auth"

  constructor(private httpClient:HttpClient) { }

  login(username:string,password:string){
    const credential = {username:username,password:password};
    
    return this.httpClient.post<LoginResponse>(this.server+"/login",credential);
  }
}
