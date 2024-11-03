import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const logedGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router);
  let _AuthService = inject(AuthService)

  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('userData') !== null) {
      _AuthService.userInformation()
      _Router.navigate(['home'])
      return false;
      
    }
    else{
      return true;
    }
    
  }
  else{
    return false
  }

};
