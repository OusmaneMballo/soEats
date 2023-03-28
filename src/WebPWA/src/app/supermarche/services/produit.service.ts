import { Injectable } from '@angular/core';
import { Produit } from '../produit';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getProduitsByIdSupermarket(superMarketId: string){
    return this.http.get<Produit[]>(API_URL + `superMarket/${superMarketId}/products`);
  }

  addProduit(file: File, produit: Produit, superMarketId : string){

    const formData = this.setFormData(file, produit);
    
    return this.http.post(API_URL + `superMarket/${superMarketId}`, formData);
  }

  updateProduit(file: File, produit: Produit){
    const formData = this.setFormData(file, produit);

     return this.http.put(API_URL + `superMarket/${produit.supermarketId}/products/${produit.id}`, formData);

  }

  deleteProduit(idcarte: string, idProduit: string){

    return this.http.delete(API_URL + `superMarket/${idcarte}/products/${idProduit}`);
  }

  setFormData(file: File, produit: Produit){

    let formData = new FormData();
    formData.append('file', file);
    formData.append('Name',produit.name );
    formData.append('Price',produit.price.toString());
    formData.append('CategoryId',produit.categorieId);
    formData.append('Description',produit.description);
    formData.append('IdSuperMarket',produit.supermarketId);
    formData.append('IdSection',produit.sectionId);

    return formData
  }
}
