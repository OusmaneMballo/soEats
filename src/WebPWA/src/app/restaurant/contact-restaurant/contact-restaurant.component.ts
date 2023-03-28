import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import {MatDialog} from '@angular/material/dialog';
import { ModifModalComponent } from 'src/app/modif-modal/modif-modal.component';
import { OptionPaiementComponent } from '../option-paiement/option-paiement.component';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-contact-restaurant',
  templateUrl: './contact-restaurant.component.html',
  styleUrls: ['./contact-restaurant.component.css']
})
export class ContactRestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(public serviceRestaurant: RestaurantService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  modifModal(restauModif: any, title: any){
    const modifModalRef = this.dialog.open(ModifModalComponent, {
      data: {restauModif, title},
      panelClass: 'panelModifModal'
    }); 
    modifModalRef.afterClosed().subscribe(result => {
      this.serviceRestaurant.getRestaurantById(this.restaurant.id).subscribe(res => {
        this.restaurant = res;
      });
  });
  }

  modifPaiementModal(restauModif: Restaurant){
    const modifPaiementModalRef = this.dialog.open(OptionPaiementComponent, {
      data: restauModif,
      panelClass: 'panelModifPaiementModal'
    }); 
    modifPaiementModalRef.afterClosed().subscribe(result => {
      this.serviceRestaurant.getRestaurantById(this.restaurant.id).subscribe(res => {
        this.restaurant = res;
      });
    });
  }

}
