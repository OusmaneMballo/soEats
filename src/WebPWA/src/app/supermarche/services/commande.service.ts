import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }

  getSuperMarcheBySlugId(slugId: string)
  {
    return this.http.get<any[]>(API_URL + `supermarkets/${slugId}`);
  }

  getCommandes(superMarketId : string)
  {
    return this.http.get<any[]>(API_URL + `supermarket/${superMarketId}/orders`);
  }

  traiterCommande(superMarketId: string, commandeId: string)
  {
    return this.http.put(API_URL + `supermarket/${superMarketId}/${commandeId}/confirm`, { "orderId": commandeId });
  }

  annulerCommande(superMarketId: string, commandeId: string){    
    return this.http.put<any>(API_URL + `supermarket/${superMarketId}/${commandeId}/cancel`, { "orderId": commandeId });
  }

  getCommandeById(superMarketId : string, commandeId: string)
  {
    return this.http.get<any>(API_URL+ `supermarket/${superMarketId}/order/${commandeId}`)
  }
}
