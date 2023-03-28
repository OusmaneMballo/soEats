import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categorie } from '../rayon';

export const API_URL = environment.SERVICE_URL;


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }
  addCategorie(categorie: Categorie){
    return this.http.post(API_URL + 'supermarket/category',categorie);
  }
  getCategories(){
    return this.http.get<Categorie[]>(API_URL + 'supermarket/category');
  }
  updateCategoryById(categoryId: string, data: any) {
    return this.http.put(API_URL + `supermarket/category/${categoryId}`, data);
  }
  getCategoryById(id: string) {
    return this.http.get<Categorie>(API_URL + `supermarket/category/${id}`);
  }
  deleteCategoryById(id: string){
    return this.http.delete(API_URL + `supermarket/category/${id}`);
  }
}
