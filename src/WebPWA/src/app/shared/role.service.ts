import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoleUser(){
    return this.http.get<any>(API_URL + `roles`);
  }
}
