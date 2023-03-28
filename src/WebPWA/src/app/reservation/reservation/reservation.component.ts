import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../../restaurant/restaurant';
import {ActivatedRoute} from '@angular/router';
import { RestaurantService } from '../../restaurant/restaurant.service';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';
import { MatDialog } from '@angular/material/dialog';
import { RaisonDannulationComponent } from '../raison-dannulation/raison-dannulation.component';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  type = "mobile";
  panelOpenState: boolean;
  cp: number=1;
  cp1: number=1;
  restaurant: Restaurant;
  reservations: Reservation[]=[];
  reservationsTraiter: Reservation[]=[];
  restaurantSlugId: any;

  constructor(public serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute, public serviceReservation: ReservationService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getReservations();
    this.panelOpenState = false;
  }

  getReservations(){
    this.restaurantSlugId = this.activatedRoute.snapshot.paramMap.get('slugId');
      this.serviceRestaurant.getRestaurantById(this.restaurantSlugId).subscribe(data => {
        this.restaurant = data;
        this.serviceReservation.getReservationsByRestaurantId(this.restaurant.id).subscribe(reservations => {
          this.reservations=[];
          this.reservationsTraiter=[]; 
          this.dipatcherReservations(reservations);
        });
      });
  }

  validation(reservation: Reservation){
    //On teste d'abord si la reservation n'est pas a confirmed 
    if(reservation.reservationStatus!=1){
      this.serviceReservation.validateReservation(reservation.restaurantId, reservation.id).subscribe(() =>{
        this.reservations=[];
        this.reservationsTraiter=[];
        this.getReservations();
        this.panelOpenState = true;
      })

    }
  }

  annulation(reservation: Reservation){
    //On teste d'abord si la reservation est a confirmed
      const modifModalRef = this.dialog.open(RaisonDannulationComponent, {
        data : reservation,
        panelClass: 'annulationreservation'
       
      }); 
      modifModalRef.afterClosed().subscribe(result => {
        this.getReservations();
        this.panelOpenState = true;
      });

  }

  /**
   * La fonction permet de faire la separation entre 
   * les reservations traitée et les reservations non traitées
   * en les ajoutant dans leurs tableaux respectifs
   * **/
  dipatcherReservations(reservations: Reservation[]){
    
    for (let index = 0; index < reservations.length; index++) {
      if(reservations[index].reservationStatus!=0){
        this.reservationsTraiter.push(reservations[index]);
      }
      else{
        this.reservations.push(reservations[index]);
      }
    }
  }
}
