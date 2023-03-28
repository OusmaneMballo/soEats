import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { MessageReservComponent } from 'src/app/message-reserv/message-reserv.component';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { ReservationService } from '../reservation.service';
import {  Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css']
})
export class ReservationClientComponent implements OnInit {

  f: FormGroup;
  submitted = false;
  today = new Date(); 
  restaurantSlugId : any;
  restaurant: Restaurant

  constructor(private formBuilder: FormBuilder, 
              public dialog: MatDialog,
              private serviceRestaurant: RestaurantService, 
              private serviceReservation: ReservationService,
              public dialogRef: MatDialogRef<ReservationClientComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public loaderService:LoaderService
            ) { }

  ngOnInit(): void {
    this.f = this.formBuilder.group({
      restaurantId : [this.data.id, null],
      reservatorEmail : ['', [Validators.email,  Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      reservatorPhoneNumber : ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      reservatorFirstname : ['', Validators.required],
      reservatorLastname : ['', Validators.required],
      reservationDate : ['', Validators.required],
      reservationTime : ['', Validators.required],
      numberOfPlaces : ['', Validators.required],
      isConfirmed : ['', null],
    });
  }


  onSaveReservation(reservation: FormGroup) {
    this.submitted = true;
    this.f.controls.reservationDate.setValue(this.f.controls.reservationDate.value.toISOString());
    if (this.f.invalid) {
      this.openMessageDialog("Formulaire invalid", "error"); 
      return;
    }else {
      this.serviceReservation.addReservation(this.f.value, this.data.id).subscribe(res => {
        this.openMessageDialog("Votre réservation est envoyée avec succes", "success"); 
        this.onClose();      
      }, err => {
      console.log(err);
    });
    }
  }

  openMessageDialog(message:any, type: any) {
    const dialogRef= this.dialog.open(MessageReservComponent, {
      data: {
        val: message,
        type: type
      },
      panelClass: 'myCss'
    });
    setTimeout(()=>{dialogRef.close()}, 2500);
  }


  
  onClose(): void {
     this.dialogRef.close();
  }
}
