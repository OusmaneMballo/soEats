import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Produit } from '../restaurant/produit/produit';
import { Carte } from '../restaurant/carte';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Menu } from './menu';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getProductsByCardId(cardId : string){
    return this.http.get<Produit[]>(API_URL + `cards/${cardId}/products`);
  }

  getProductByProductId(cardId : string, productId: string){
    return this.http.get<Produit>(API_URL + `cards/${cardId}/products/${productId}`);
  }

   addMenuRestaurant(CardId: string, Name: string, Price: string, File:any, ProductIds: any[]) {
       const formData: FormData = new FormData();
       formData.append('CardId', CardId);
       formData.append('Name', Name);
       formData.append('Price', Price.toString());
       formData.append('File', File);
       var index = 0;
       for(var pId of ProductIds){
         formData.append("ProductIds[" + index + "]", pId);
         index++;
        }
     return this.http.post(API_URL + `cards/${CardId}/menus`, formData);
   }

  getCardByRestaurantId(restaurantId: string){
    return this.http.get<Carte>(API_URL + `restaurants/${restaurantId}/cards`);
  }

  getMenus(cardId: string){
    return this.http.get<any[]>(API_URL + `cards/${cardId}/menus`);
  }

  getMenusByMenuId(cardId: string, menuId: string){
    return this.http.get<Menu>(API_URL + `cards/${cardId}/menus/${menuId}`);
  }

  deleteMenuRestaurant(cardId: string, menuId: string){
    return this.http.delete(API_URL + `cards/${cardId}/menus/${menuId}`);
  }

  updateMenuRestaurant(cardId: string, menuId: string, Name: string, Price: string, File:any, ProductIds: any[]){
    const formData: FormData = new FormData();
    formData.append('CardId', cardId);
    formData.append('MenuId', menuId);
    formData.append('Name', Name);
    formData.append('Price', Price.toString());
    formData.append('File', File);
    var index = 0;
    for(var pId of ProductIds){
      formData.append("ProductIds[" + index + "]", pId);
      index++;
     }
  return this.http.put(API_URL + `cards/${cardId}/menus/${menuId}`, formData);
  }

}
