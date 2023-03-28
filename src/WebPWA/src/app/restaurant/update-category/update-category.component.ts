import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { Restaurant, RestaurantCategorie } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  restaurantCategories: any[] = [];
  categoryRestaurant: any[] = [];
  restaurants: Restaurant[] = [];
  restaurantCategoriesSelected: RestaurantCategorie[]=[];
  restaurantSelected: Restaurant;
  restaurantCategory:RestaurantCategorie
  restaurantIdSelected: String;
  cardId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public restaurantService: RestaurantService) { }
  ngOnInit(): void {
    this.getRestaurantCategory();
    this.getRestaurants();
  }

  getRestaurantCategory() {
    this.restaurantService.getAllRestaurantCategorie().subscribe((data) => {
      this.restaurantCategories = data;
      data.forEach(d => {
        this.categoryRestaurant.push({ bgColor: { 'background-color': '#eeeff6' }, object: d, selected: false });
      })

    }, (error) => {
      console.log(error)
    });
  }

  getRestaurants() {
    this.restaurantService.getAllRestaurant().subscribe((data) => {
      this.restaurants = data;
    }, (error) => {
      console.log(error)
    });
  }

  onSelected(restaurantCategorie: any) {
    this.restaurantCategories.forEach((elem) => {
      if (elem == restaurantCategorie.object) {
        if (restaurantCategorie.selected == false) {
          restaurantCategorie.bgColor = { 'background-color': '#57596d' };
          this.restaurantCategoriesSelected.push(restaurantCategorie.object);
          restaurantCategorie.selected = true;
        }
        else {

          restaurantCategorie.bgColor = { 'background-color': '#eeeff6' };
          restaurantCategorie.selected = false;
          this.restaurantCategoriesSelected.splice(restaurantCategorie.object, 1);
        }
      }
     
    })
  }

  addTypeProduct() {
    // console.log(this.productsSelected)
  }

  selectRestaurant($event: any) {
    //Recuperation de l'id du restaurant séléctioné
    this.restaurantIdSelected = $event.target.value;
    for (let i = 0; i < this.restaurants.length; i++) {
      if (this.restaurantIdSelected == this.restaurants[i].id) {
        this.restaurantSelected = this.restaurants[i];
      }
    }
  }

  setType() {
    if (this.restaurantSelected != null && this.restaurantCategoriesSelected != null) {
      this.restaurantSelected.restaurantCategories = this.restaurantCategoriesSelected
     
      this.restaurantService.updateRestaurantById(this.restaurantSelected.id, this.restaurantSelected).subscribe((data) => {
        Swal.fire({
          width: '25rem',
          position: 'center',
          icon: 'success',
          title: 'Succes !',
          showConfirmButton: false,
          timer: 2500
        });
      }, (error) => {
        console.log(error)
        Swal.fire({
          width: '25rem',
          position: 'center',
          icon: 'error',
          title: 'Oups!... erreur',
          showConfirmButton: false,
          timer: 2500
        });
      });
    }
    else {
      Swal.fire({
        width: '25rem',
        position: 'center',
        icon: 'error',
        title: 'Oups!... erreur',
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

}

