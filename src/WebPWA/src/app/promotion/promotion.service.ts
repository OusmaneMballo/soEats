import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Promotion } from './promotion';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  addPromotion(promotion: Promotion, file: File) {
    let formData = this.setFormData(file,promotion)
    return this.http.post(API_URL + `promotions`, formData);
  }

  getPromotionsRestaurant(restaurantId: string) {
    return this.http.get<any[]>(API_URL + `promotions/${restaurantId}`);
  }

  deletePromoByIdRestaurantAndIdPromo(promotion: any) {
    return this.http.delete(API_URL + `promotions/${promotion.restaurant.id}/${promotion.id}`);
  }

  updatePromotionById(promotion: Promotion) {
    return this.http.put(API_URL + `promotions/${promotion.id}`, promotion);
  }
  setFormData(file: File, promotion: Promotion) {
    let formData = new FormData();

    formData.append('ImageFile', file);
    formData.append('RestaurantId', promotion.restaurantId);
    formData.append('Name', promotion.name);
    formData.append('StartDate', promotion.startDate.toUTCString());
    formData.append('EndDate', promotion.endDate.toUTCString());
    formData.append('Reduction', promotion.reduction.toString());

    if (promotion.productTypes.length > 0) {
      for (let i = 0; i < promotion.productTypes.length; i++) {
        formData.append('ProductTypes[' + i + '].id', promotion.productTypes[i].id)
        formData.append('ProductTypes[' + i + '].displayName', promotion.productTypes[i].displayName)
        formData.append('ProductTypes[' + i + '].value', promotion.productTypes[i].value)
      }
      if (promotion.categories.length > 0) {
        for (let index = 0; index < promotion.categories.length; index++) {
          formData.append('Categories[]', JSON.stringify(promotion.categories[index]));
        }
      }
    }
    else {
      promotion.productTypes = [];
      formData.append('ProductTypes[]', JSON.stringify(promotion.productTypes))
      if (promotion.categories.length > 0) {
        for (let index = 0; index < promotion.categories.length; index++) {
          formData.append('Categories[]', JSON.stringify(promotion.categories[index]));
        }
      }
      else{
        promotion.categories = [];
        formData.append('Categories[]', JSON.stringify(promotion.categories));
      }
    }
    return formData
  }
}
