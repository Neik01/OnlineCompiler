import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Show an alert with the error message
        if (error.status === 0) {
          // Handle network error or no response from the server
          alert('Không có internet.');
        } else {
          // Show the error status and message
          alert(`Lỗi ${error.status}: ${error.message}`);
        }
        // Rethrow the error so that other parts of the application can handle it if needed
        throw error;
      })
    );
  }
}
