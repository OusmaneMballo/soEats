import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { ModifModalComponent } from 'src/app/modif-modal/modif-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { RestaurantService } from '../restaurant.service';
@Component({
  selector: 'app-description-restaurant',
  templateUrl: './description-restaurant.component.html',
  styleUrls: ['./description-restaurant.component.css']
})
export class DescriptionRestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(public serviceRestaurant: RestaurantService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modifModalDesc(restauModif: any, title: any){
    const modifModalRef = this.dialog.open(ModifModalComponent, {
      data: {restauModif, title},
      panelClass: 'panelModifModalDesc'
    }); 
    modifModalRef.afterClosed().subscribe(result => {
      this.serviceRestaurant.getRestaurantById(this.restaurant.id).subscribe(res => {
        this.restaurant = res;
      });
  });
  }

}
