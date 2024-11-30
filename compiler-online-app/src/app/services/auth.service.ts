import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../Model/LoginResponse';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../Model/EntityResponse';
import { Token } from '../Model/Token';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  server = environment.SERVER_URL+"/auth"
  
  isLogin = new BehaviorSubject<boolean>(false);
  redirectUrl:string = null;
  user = new BehaviorSubject<User>(null);
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
    
  }

  logout(){

    localStorage.removeItem('jwtToken');
    this.isLogin.next(false);
  }

}
