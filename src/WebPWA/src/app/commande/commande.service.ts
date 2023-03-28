import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './order';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }

  getCommandes(restaurantId : string){
    return this.http.get<any[]>(API_URL + `restaurants/${restaurantId}/orders`);
  }

  getDelivryZones(){
    return this.http.get<any[]>(API_URL + 'deliveryZone');
  }

  getCommandesByIdcommande(restaurantId: any, commandeId: any){
    return this.http.get<any>(API_URL + `restaurants/${restaurantId}/orders/${commandeId}`);
  }

  traiterCommande(restaurantId: string, commandeId: string){
    return this.http.put(API_URL + `restaurants/${restaurantId}/orders/${commandeId}`, {
      "orderId": commandeId
    });
  }

  annulerCommande(restaurantId: string, commandeId: string){    
    return this.http.put<any>(API_URL + `restaurants/${restaurantId}/orders/${commandeId}/annuler`, {
      "orderId": commandeId
    });
  }

  addCommande(restaurantId: string, order: Order){
    return this.http.post(API_URL + `restaurants/${restaurantId}/orders`, order);
  }
  


}
