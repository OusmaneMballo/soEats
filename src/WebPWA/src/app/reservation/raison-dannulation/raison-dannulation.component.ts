import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-raison-dannulation',
  templateUrl: './raison-dannulation.component.html',
  styleUrls: ['./raison-dannulation.component.css']
})
export class RaisonDannulationComponent implements OnInit {
  f: FormGroup;
  submitted: boolean;
  disable = false;
  type = "mobile";
  panelOpenState: boolean;
  cp: number=1;
  cp1: number=1;
  restaurant: Restaurant;
  reservations: Reservation[]=[];
  reservationsTraiter: Reservation[]=[];
  restaurantSlugId: any;


  constructor(public serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private serviceReservation: ReservationService, public modifModalRef: MatDialogRef<RaisonDannulationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getReservations();
    this.f = this.formBuilder.group({
      reservatorEmail : [this.data.reservatorEmail, [Validators.email,  Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      reservatorPhoneNumber : [this.data.reservatorPhoneNumber, [Validators.required, Validators.pattern("[0-9]{9}")]],
      reservatorFirstname : [this.data.reservatorFirstname, Validators.required],
      reservatorLastname : [this.data.reservatorLastname, Validators.required],
      reservationDate : [this.data.reservationDate, Validators.required],
      reservationTime : [this.data.reservationTime, Validators.required],
      numberOfPlaces : [this.data.numberOfPlaces, Validators.required],
      isConfirmed : ['', null],
      raisonannulation: ['',  Validators.required],
      
    });
   }

   
  onEditRestaurant(datas: FormGroup) {
    this.submitted = true;
    let reservation=new Reservation();
    reservation.id=this.data.id
    reservation.numberOfPlaces= this.data.numberOfPlaces;
    reservation.reservationDate= this.data.reservationDate;
    reservation.reservationTime= this.data.reservationTime;
    reservation.reservatorEmail= this.data.reservatorEmail;
    reservation.reservatorFirstname= this.data.reservatorFirstname;
    reservation.reservatorLastname= this.data.reservatorLastname;
    reservation.reservatorPhoneNumber= this.data.reservatorPhoneNumber;
    reservation.restaurantId= this.data.restaurantId;
    reservation.ReasonToCancel = this.f.controls["raisonannulation"].value;

     if(reservation.reservationStatus!=2){
         this.serviceReservation.annulerReservation(reservation.restaurantId, reservation.id, reservation.ReasonToCancel).subscribe(() =>{
            this.getReservations();
            this.panelOpenState = true;
            this.modifModalRef.close();          
          })
      }
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
