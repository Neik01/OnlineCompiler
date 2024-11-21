import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../Model/LoginResponse';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../Model/EntityResponse';
import { Token } from '../Model/Token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  server = "http://localhost:8080/api/auth"
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

  loginWithGoogle(){

  }

  getGoogleLoginUrl(){

    return this.httpClient.get("http://localhost:8080/oauth2/google/url");
  }

  getGoogleToken(code: string): Observable<boolean> {
    return this.httpClient.get<Token>("http://localhost:8080/oauth2/google/callback?code=" + code, {observe: "response"})
      .pipe(map((response: HttpResponse<Token>) => {
        console.log("Got token "+ response.body.token);
        
        if (response.status === 200 && response.body !== null) {
          
          localStorage.setItem("jwtToken",response.body.token)
          return true;
        } else {
          return false;
        }
      }));
  }
}
