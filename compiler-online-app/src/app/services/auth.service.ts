import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginResponse } from '../Model/LoginResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  server = "http://localhost:8080/api/auth"
  isLogin = new BehaviorSubject<boolean>(false);
  constructor(private httpClient:HttpClient) { }

  login(username:string,password:string){
    const credential = {username:username,password:password};
    
    return this.httpClient.post<LoginResponse>(this.server+"/login",credential);
  }

  register(value: any) {
    
    const user ={username:value.username,email:value.email,password:value.password}
   
    return this.httpClient.post<string>(this.server+"/register",user);
  }

  getLoginState(){
    return this.isLogin.asObservable();
  }

  setLoginState(){
    const token = localStorage.getItem('jwtToken');
    if(!token){
      this.isLogin.next(false);
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));

    const currentTime = Math.floor(Date.now() / 1000); // In seconds
    const tokenExpirationTime = payload.exp;

 
    this.isLogin.next(tokenExpirationTime > currentTime)
  
    console.log(this.isLogin.getValue());
    
  }

  logout(){

    localStorage.removeItem('jwtToken');
    this.isLogin.next(false);
  }
}
