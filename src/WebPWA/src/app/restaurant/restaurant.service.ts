import { Injectable } from '@angular/core';
import { Restaurant, RestaurantCategorie} from './restaurant';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';



export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurant: Restaurant[] = [];
  

  constructor(private http: HttpClient) {
  }

  getAllRestaurant(){
    return this.http.get<Restaurant[]>(API_URL + 'restaurants');
  }

  getAllRestaurantCategorie(){
    return this.http.get<RestaurantCategorie[]>(API_URL + 'restaurants/categories');
  }

  getAllRestaurantByOwnerId(ownerId: string){
    return this.http.get<Restaurant[]>(API_URL + `restaurants/${ownerId}/restaurants`);
  }

  getRestaurantById(id: string) {
    return this.http.get<Restaurant>(API_URL + `restaurants/${id}`);
  }

  getRestaurantBySlugId(slugId: string) {
    return this.http.get<Restaurant>(API_URL + `restaurants/${slugId}`);
  }

  updateRestaurantById(restaurantId: string, data: any) {
    return this.http.put(API_URL + `restaurants/${restaurantId}`, data);
  }


  addRestaurant(restaurant: Restaurant){
    return this.http.post(API_URL + 'restaurants',restaurant);
  }

  addRestaurantCategorie(restaurantCate: RestaurantCategorie){
    return this.http.post(API_URL+`restaurants/categories`, restaurantCate);
  }

  addLogoRestaurant(id: string, file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_URL + `restaurants/${id}/image`, formData);
  }

  addMenuRestaurant(id: string, file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_URL + `restaurants/${id}/menuImages`, formData);
  }

  addPhotoRestaurant(id: string, file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_URL + `restaurants/${id}/photos`, formData);
  }

  updatePhotoRestaurant(id: string, file: any, photoId: string) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.put(API_URL + `restaurants/${id}/photos/${photoId}`, formData);
  }

  updateImageRestaurantCategorie(id: string, file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id',id );
    return this.http.put(API_URL + `restaurants/categories/${id}`, formData);
  }

  deletePhotoRestaurant(id: string, photoId: string){
    return this.http.delete(API_URL + `restaurants/${id}/photos/${photoId}`);
  }

  deleteRestaurantById(id: string){
    return this.http.delete(API_URL + `restaurants/${id}`);
  }

}
