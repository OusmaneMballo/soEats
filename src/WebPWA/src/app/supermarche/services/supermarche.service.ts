import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supermarche } from '../supermarche';

export const API_URL = environment.SERVICE_URL;


@Injectable({
  providedIn: 'root'
})
export class SupermarcheService {
  supermarche: Supermarche[] = [];

  constructor(private http: HttpClient) { }
  getAllSupermarche(){
    return this.http.get<Supermarche[]>(API_URL + 'supermarkets');
  }

  getAllSupermarcheByOwnerId(ownerId: string){
    return this.http.get<Supermarche[]>(API_URL + `supermarkets/${ownerId}/supermaketManager`);
  }

  getSupermarcheById(id: string) {
    return this.http.get<Supermarche>(API_URL + `supermarkets/${id}`);
  }

  getSupermarketBySlugId(slugId: string) {
    return this.http.get<Supermarche>(API_URL + `supermarkets/${slugId}`);
  }

  updateSupermarcheById(supermarcheId: string, data: any) {
    return this.http.put(API_URL + `supermarkets/${supermarcheId}`, data);
  }


  addSupermarche(supermarche: Supermarche){
    return this.http.post(API_URL + 'supermarkets',supermarche);
  }

  addLogoSupermarche(id: string, file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_URL + `supermarkets/${id}/image`, formData);
  }

  addPhotoSupermarche(id: string, file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_URL + `supermarkets/${id}/photos`, formData);
  }

  updatePhotoSupermarche(id: string, file: any, photoId: string) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.put(API_URL + `supermarkets/${id}/photos/${photoId}`, formData);
  }

  deletePhotoSupermarche(id: string, photoId: string){
    return this.http.delete(API_URL + `supermarkets/${id}/photos/${photoId}`);
  }

  deleteSupermarceById(id: string){
    return this.http.delete(API_URL + `supermarkets/${id}`);
  }
}
