import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Restaurant } from '../restaurant/restaurant';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Router} from '@angular/router';
import { PageAccueilRestaurantComponent } from '../restaurant/page-accueil-restaurant/page-accueil-restaurant.component';


@Component({
  selector: 'app-modif-modal',
  templateUrl: './modif-modal.component.html',
  styleUrls: ['./modif-modal.component.css']
})
export class ModifModalComponent implements OnInit {

  f: FormGroup;
  submitted = false;

  
  constructor(public modifModalRef: MatDialogRef<ModifModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.f = this.formBuilder.group({
      restaurantId: [null, null],
      phoneNumber : ['', [Validators.required,  Validators.pattern("[0-9]{9}")]],
      address : ['', Validators.required],
      email: ['', null],
      name : ['', Validators.required],
      ownerId: ['', null],
      description : ['', Validators.required],
    });
     this.initForm(this.data.restauModif); 
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
    });
  }

  onEditRestaurant(data: FormGroup) {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    }

     this.restaurantService.updateRestaurantById(this.data.restauModif.id, data).subscribe(res => {
         this.onClose();         
     }, err => {
       console.log(err);
     });
  }  
 
  onClose(): void {
    this.modifModalRef.close();
  }

}
