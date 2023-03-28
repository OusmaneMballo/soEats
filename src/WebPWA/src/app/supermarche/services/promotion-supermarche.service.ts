import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Promotion } from '../promotion/promotion';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class PromotionSupermarcheService {

  constructor(private http: HttpClient) { }

  addPromotion(promotion: Promotion, file: File) {
    let formData = this.setFormData(file,promotion)
    return this.http.post(API_URL + `superMarket/promotion`, formData);
  }

  getPromotionsSupermarche(supermacheId: string) {
    return this.http.get<any[]>(API_URL + `superMarket/${supermacheId}/promotions`);
  }

  getPromotions() {
    return this.http.get<any[]>(API_URL + `superMarket/promotions`);
  }

  deletePromoByIdSupermarcheAndIdPromo(promotion: any) {
    return this.http.delete(API_URL + `superMarket/${promotion.superMarket.id}/promotion/${promotion.id}`);
  }

  updatePromotionById(promotion: Promotion) {
    return this.http.put(API_URL + `superMarket/${promotion.superMarketId}/promotion/${promotion.id}`, promotion);
  }
  setFormData(file: File, promotion: Promotion) {
    let formData = new FormData();

    formData.append('ImageFile', file);
    formData.append('SuperMarketId', promotion.superMarketId);
    formData.append('Name', promotion.name);
    formData.append('StartDate', promotion.startDate.toUTCString());
    formData.append('EndDate', promotion.endDate.toUTCString());
    formData.append('Reduction', promotion.reduction.toString());

    if (promotion.categories.length > 0) {
      for (let i = 0; i < promotion.categories.length; i++) {
        formData.append('Categories[' + i + '].id', promotion.categories[i].id)
        formData.append('Categories[' + i + '].displayName', promotion.categories[i].displayName)
        formData.append('Categories[' + i + '].value', promotion.categories[i].value)
      }
    }
    return formData
  }
}
