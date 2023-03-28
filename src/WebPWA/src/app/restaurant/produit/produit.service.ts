import { Injectable } from '@angular/core';

import { Restaurant} from 'src/app/restaurant/restaurant';
import { Carte } from 'src/app/restaurant/carte';
import { Produit } from './produit';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductType } from './typeProduct';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getCarteByIdRestaurant(idRestaurant: string){
    return this.http.get<Carte>(API_URL + `restaurants/${idRestaurant}/cards`);
  }

  getTypeProduct(){return this.http.get<ProductType[]>(API_URL + `productType`)}

  getProduitsByIdCarte(idcarte: string){
    return this.http.get<Produit[]>(API_URL + `cards/${idcarte}/products`);
  }

  addProduit(idcarte: any, file: File, produit: Produit){

    const formData = this.setFormData(file, produit);
    
    return this.http.post(API_URL + `cards/${idcarte}/products`, formData);
  }

  addTypeProduct(productType: ProductType){
    return this.http.post(API_URL+`productType`, productType);
  }

  updateProduit(file: File, produit: Produit){
    const formData = this.setFormData(file, produit);

    return this.http.put(API_URL + `cards/${produit.cardId}/products/${produit.id}`, formData);

  }

  updateTypeProducts(idcarte: any, object: any){
    return this.http.put(API_URL + `cards/${idcarte}/products`, object);
  }

  deleteProduitByIdCarteAndIdProduit(idcarte: string, idProduit: string){

    return this.http.delete(API_URL + `cards/${idcarte}/products/${idProduit}`);
  }

  setFormData(file: File, produit: Produit){

    let formData = new FormData();
    formData.append('file', file);
    formData.append('Name',produit.name );
    formData.append('Price',produit.price.toString());
    formData.append('Categorie',produit.categorie.toString());
    formData.append('Description',produit.description);
    formData.append('CardId',produit.cardId);
    formData.append('ProductTypeId',produit.productType.id);
    formData.append('Id',produit.id);
    return formData
  }
}
