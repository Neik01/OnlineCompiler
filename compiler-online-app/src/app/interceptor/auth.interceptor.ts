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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public router:Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let request= req.clone({
      withCredentials:true,
      reportProgress:true,
      headers:req.headers.set("Authorization","Bearer "+localStorage.getItem('jwtToken'))
     })
     
     return next.handle(request)
     .pipe(catchError((error: HttpErrorResponse)=>{
      if(error.status=== HttpStatusCode.Unauthorized||error.status===HttpStatusCode.Forbidden)
          this.router.navigateByUrl("/auth/login");

      return throwError(() => error);
     }));
  }
}
