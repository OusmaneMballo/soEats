import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Restaurant } from '../../restaurant';
import { RestaurantService } from '../../restaurant.service';

@Component({
  selector: 'app-ajout-logo-restaurant',
  templateUrl: './ajout-logo-restaurant.component.html',
  styleUrls: ['./ajout-logo-restaurant.component.css']
})
export class AjoutLogoRestaurantComponent implements OnInit {

  logo: File;
  imgURL: any;
  idRestaurant: any;

  constructor(
    public dialogRef: MatDialogRef<AjoutLogoRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Restaurant,
    public serviceRestaurant: RestaurantService) {
      
    }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.imageUrl){
      this.imgURL = this.data.imageUrl;
    }
  }
  
  preview(files: any) {
    if (files.length === 0)
      return;
      
      this.logo = files[0];
 
    var reader = new FileReader();
    reader.readAsDataURL(this.logo); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  addLogo(): void{
     if(this.logo){
      this.serviceRestaurant.addLogoRestaurant(this.data.id, this.logo).subscribe(res => {
        this.onClose();
       });
     }
  }

}
