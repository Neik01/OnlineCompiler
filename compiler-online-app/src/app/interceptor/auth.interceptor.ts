import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public router:Router, public keycloak:KeycloakService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
     let request= req.clone({
      withCredentials:true,
      reportProgress:true,
      headers:req.headers.set("Authorization","Bearer "+this.keycloak.keycloak.token)
     })
     
     return next.handle(request)
  }
}
