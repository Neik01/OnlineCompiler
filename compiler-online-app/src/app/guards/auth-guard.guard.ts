import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuardGuard: CanActivateChildFn = (route, state) => {
  
  const authServicer = inject(AuthService);
  const router = inject(Router);


  const token = localStorage.getItem('jwtToken');
    if(!token){
      
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));

    const currentTime = Math.floor(Date.now() / 1000); // In seconds
    const tokenExpirationTime = payload.exp;

    if(tokenExpirationTime > currentTime){
      console.log(true);
      authServicer.setLoginState();
      return true;
    }
    else
      {
        console.log(false);
        authServicer.setLoginState();
        router.navigate(["/auth/login"]);
        return false
      }
 
   
  // Use the getLoginState() method which returns an Observable<boolean>

};
