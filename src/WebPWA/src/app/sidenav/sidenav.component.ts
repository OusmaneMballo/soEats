import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionType, InteractionStatus, PopupRequest, RedirectRequest, AuthenticationResult, AuthError } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { b2cPolicies, apiConfig, isIE } from 'src/environments/environment';
import { tokenRequest} from 'src/environments/environment';
import { VariablesGlobales} from 'src/app/shared/globale';
import { RoleService } from '../shared/role.service';

interface IdTokenClaims extends AuthenticationResult {
  idTokenClaims: {
    acr?: string
  }
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy{
  title = 'MSAL Angular v2 B2C Sample';
  isIframe = false;
  loginDisplay = false;
  userName: any;
  ownerId: any;
  private readonly _destroying$ = new Subject<void>();

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router, public global: VariablesGlobales, private serviceRole: RoleService) {
     
  }

  ngOnInit(): void {
  }

  /**
   * Fonction qui appelle le formulaire de connexion
   * du serveur d'authorisation B2C
   * **/
   login() {
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup(tokenRequest).subscribe((Response: AuthenticationResult)=>{

        this.authService.instance.setActiveAccount(Response.account);
        this.loginDisplay = true;
        this.global.loginDisplay=true;
        this.global.userName=Response.account?.name;
        this.userName=Response.account?.name;
        this.ownerId=Response.account?.localAccountId;
        localStorage.setItem('uN',this.global.userName);
        localStorage.setItem('tkn', Response.accessToken);
        localStorage.setItem("panier", "");
        localStorage.setItem("totalProduit", "");

        if(Response.account != null){
          this.serviceRole.getRoleUser().subscribe((data)=>{
            if (data.role == this.global.roles.restaurateur) {
              this.router.navigate(['restaurateurs/'+this.ownerId]);
            }else{
              this.router.navigate(['supermarketmanager/'+this.ownerId]);
            }
          })
        }
        
      });
    }
  }
  /***
   * 
   *Fonction de deconnexion 
   ***/
   logout() {
    this.authService.instance.setActiveAccount(null);
    this.loginDisplay = false;
    localStorage.clear();
    this.global.loginDisplay=false;
    this.global.userName=null;
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();

  }

}
