import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RestaurantCategorie } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  @ViewChild('FormAddCategorie') form: any;

  categorie: RestaurantCategorie;
  restaurantCategorie: RestaurantCategorie[]=[];
  categoriesSelected = new FormControl();
  photo: File;
  imgURL: any;
  constructor(private serviceRestau: RestaurantService) { }

  ngOnInit(): void {
    this.categorie=new RestaurantCategorie();
    this.getRestaurantCategorie();
  }

  getRestaurantCategorie(){
    this.serviceRestau.getAllRestaurantCategorie().subscribe((data)=>{
      console.log(data);
      this.restaurantCategorie=data;
    })
  }

  createRestaurantCategorie(){
    this.serviceRestau.updateImageRestaurantCategorie(this.categorie.id, this.photo).subscribe((result)=>{
      this.form.reset();
    }, (error)=>{})
  }

  preview(files: any) {
    if (files.length === 0)
      return;
      
    this.photo = files[0];
 
    var reader = new FileReader();
    reader.readAsDataURL(this.photo); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
