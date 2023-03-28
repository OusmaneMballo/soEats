import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-option-paiement',
  templateUrl: './option-paiement.component.html',
  styleUrls: ['./option-paiement.component.css']
})
export class OptionPaiementComponent implements OnInit {
  
  f: FormGroup;
  payerCash: boolean;
  submitted: boolean;
  favoriteSeason: number;
  check = true;
  constructor(private formBuilder: FormBuilder,  public restaurantService: RestaurantService, public modifModalRef: MatDialogRef<OptionPaiementComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.f = this.formBuilder.group({
      restaurantId: [null, null],
      phoneNumber : ['', null],
      address : ['', null],
      email: ['', null],
      name : ['', null],
      ownerId: ['', null],
      description : ['',null],
      typeDeliveryMethod : ['', Validators.required],
    });
    
    console.log(this.data);
     this.initForm(this.data); 
   }

  initForm(restaurant: Restaurant) {
    this.f = this.formBuilder.group({
      restaurantId : [restaurant.id, null],
      phoneNumber: [restaurant.phoneNumber,[ Validators.required,  Validators.pattern(new RegExp("[0-9]{9}"))]],
      address : [restaurant.address, Validators.required],
      email: [restaurant.email, null],
      name : [restaurant.name, Validators.required],
      ownerId: [restaurant.ownerId, null],
      description : [restaurant.description, null],
      typeDeliveryMethod : [restaurant.typeDeliveryMethod, null]
    });
  }

  onClose(): void {
    this.modifModalRef.close();
 }

  onEditRestaurant(datas: FormGroup) {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    }

    console.log(datas);

     this.restaurantService.updateRestaurantById(this.data.id, datas).subscribe(res => {
         this.onClose();         
     }, err => {
       console.log(err);
     });
  }

}
