import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  today = new Date(); 
  restaurantSlugId : any;
  restaurant: Restaurant

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private serviceRestaurant: RestaurantService,
    private serviceReservation: ReservationService,
    public dialogRef: MatDialogRef<EditReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.editForm = this.formBuilder.group({
      reservatorEmail : [this.data.reservatorEmail, [Validators.email,  Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      reservatorPhoneNumber : [this.data.reservatorPhoneNumber, [Validators.required, Validators.pattern("[0-9]{9}")]],
      reservatorFirstname : [this.data.reservatorFirstname, Validators.required],
      reservatorLastname : [this.data.reservatorLastname, Validators.required],
      reservationDate : [this.data.reservationDate, Validators.required],
      reservationTime : [this.data.reservationTime, Validators.required],
      numberOfPlaces : [this.data.numberOfPlaces, Validators.required],
      isConfirmed : ['', null],
    });
  }

  editReservation(){
    if(this.editForm.valid){
      let reservation=new Reservation();
      reservation.id=this.data.id
      reservation.numberOfPlaces= this.editForm.controls["numberOfPlaces"].value;
      reservation.reservationDate= this.editForm.controls["reservationDate"].value;
      reservation.reservationTime= this.editForm.controls["reservationTime"].value;
      reservation.reservatorEmail= this.editForm.controls["reservatorEmail"].value;
      reservation.reservatorFirstname= this.editForm.controls["reservatorFirstname"].value;
      reservation.reservatorLastname= this.editForm.controls["reservatorLastname"].value;
      reservation.reservatorPhoneNumber= this.editForm.controls["reservatorPhoneNumber"].value;
      reservation.restaurantId= this.data.restaurantId;

      this.serviceReservation.updateReservationById(reservation.restaurantId,reservation.id, reservation).subscribe(res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Réservation modifiée',
          showConfirmButton: false,
          timer: 1500
        })
      }, err => {
        console.log(err);
      });

      //this.close();
    }
  }

  close(){
    let reservation=new Reservation();
    reservation.id=this.data.id
    reservation.restaurantId= this.data.restaurantId;
    this.serviceReservation.deleteReservationById(reservation.restaurantId,reservation.id).subscribe(res =>{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Réservation supprimée',
        showConfirmButton: false,
        timer: 1500
      })
    }, err => {
      console.log(err);
    });
    this.dialogRef.close();
  }
}
