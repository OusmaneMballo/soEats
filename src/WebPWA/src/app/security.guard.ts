import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  authService: any;
  loginDisplay: boolean;
  userName: any;

  constructor(private msalService: MsalService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.msalService.instance.getActiveAccount()==null){
        if(localStorage.getItem('uN')){
          return true;
        }
        else{
          this.router.navigate(['/']);
        }
        return false;
      }
    return true;
  }
  
}
