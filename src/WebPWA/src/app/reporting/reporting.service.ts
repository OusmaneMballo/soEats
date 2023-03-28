import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private http: HttpClient) { }


  getReservation(restaurantId: any, startDate: any, endDate:any){
    let parametres={'startDate':startDate, 'endDate':endDate};
    return this.http.get<any>(API_URL + `reporting/${restaurantId}`, { params: parametres });
  }
}
