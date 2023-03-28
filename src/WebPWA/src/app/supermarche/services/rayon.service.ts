import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rayon } from '../rayon';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class RayonService {

  constructor(private http: HttpClient) { }

  addRayon(rayon: Rayon, file: any) {
    let formData = this.setFormData(file,rayon)
    return this.http.post(API_URL + `supermarket/sections`, formData);
  }
  setFormData(file: File, rayon: Rayon) {
    let formData = new FormData();
    formData.append('SuperMarketId', rayon.superMarketId);
    formData.append('DisplayName', rayon.displayName);
    if (rayon.categories.length > 0) {
      for (let i = 0; i < rayon.categories.length; i++) {
        formData.append('Categories['+i+'].id', rayon.categories[i].id)
        formData.append('Categories['+i+'].displayName', rayon.categories[i].displayName)
        formData.append('Categories['+i+'].value', rayon.categories[i].value)
      }
    }
    formData.append('ImageFile', file);
    return formData
  }
  getRayons(superMarketId : string){
    return this.http.get<Rayon[]>(API_URL + `supermarket/sections/${superMarketId}`);
  }
  getRayonProducts(superMarketId : string, sectionId: string){
    return this.http.get<Rayon[]>(API_URL + `superMarket/${superMarketId}/${sectionId}/products`);
  }

  deleteRayon(id: string, idSupermarche: string){
    return this.http.delete(API_URL + `supermarket/sections/${id}/${idSupermarche}`);
  }

  deleteRayonProduct(superMarketId: string, sectionId: string ,productId: string){
    return this.http.delete(API_URL + `superMarket/${superMarketId}/${sectionId}/${productId}`);
  }

}
