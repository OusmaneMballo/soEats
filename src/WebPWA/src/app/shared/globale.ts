import { Injectable } from '@angular/core';

@Injectable()
export class VariablesGlobales {
  loginDisplay: boolean =false;
  userName: any;
  totalProduit: number=0;
  prixTotal: number=0;
  data:any= {etat:false, items:[]};
  roles: any = {restaurateur: 'Restaurateur', supermarketmanager: 'SuperMarketManager'}
} 