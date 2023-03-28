import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BoundText } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from './reservation';

export const API_URL = environment.SERVICE_URL;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[];

  constructor(private http: HttpClient) { }

  getReservations(){
    return this.http.get<Reservation[]>(API_URL + 'reservations');
  }

  getReservation(reservationId: any){
    return this.http.get<Reservation>(API_URL + `edit/${reservationId}`);
  }

  updateReservationById(restaurantId: string, reservationId: any, data: any) {
    return this.http.put(API_URL + `restaurants/${restaurantId}/reservations/${reservationId}/update`, data);
  }

  deleteReservationById(restaurantId: string, reservationId: any) {
    return this.http.delete(API_URL + `restaurants/${restaurantId}/reservations/${reservationId}`);
  }

  getReservationsByRestaurantId(restaurantId: any){
    return this.http.get<Reservation[]>(API_URL + `restaurants/${restaurantId}/reservations`);
  }

  addReservation(reservation: any, restaurantId: any){
    return this.http.post(API_URL + `restaurants/${restaurantId}/reservations`, reservation);
  }

  validateReservation(restaurantId: any, reservationId: any){

      return this.http.put(API_URL + `restaurants/${restaurantId}/reservations/${reservationId}`, {
        "reservationId": reservationId
      }, httpOptions);
  }

  annulerReservation(restaurantId: any, reservationId: any, raisonannulation : any){
    
    return this.http.put<any>(API_URL + `restaurants/${restaurantId}/reservations/${reservationId}/annuler`, {
      "reservationId": reservationId,
      "ReasonToCancel" : raisonannulation,
    }, httpOptions);
  }

}
