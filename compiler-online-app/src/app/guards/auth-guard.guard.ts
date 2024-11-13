import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  
  if(keycloakService.keycloak?.isTokenExpired()){
    router.navigate(['auth/login']);
    return false;
  }
   

  return true;
};
