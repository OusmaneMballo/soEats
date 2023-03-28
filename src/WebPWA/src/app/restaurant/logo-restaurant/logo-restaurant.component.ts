import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../restaurant';
import { MatDialog } from '@angular/material/dialog';
import { AjoutLogoRestaurantComponent } from './ajout-logo-restaurant/ajout-logo-restaurant.component';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-logo-restaurant',
  templateUrl: './logo-restaurant.component.html',
  styleUrls: ['./logo-restaurant.component.css']
})
export class LogoRestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(public dialog: MatDialog, public serviceRestaurant: RestaurantService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutLogoRestaurantComponent, {
      width: '470px',
      data: this.restaurant,
      panelClass: 'myapp-no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.serviceRestaurant.getRestaurantById(this.restaurant.id).subscribe(res => {
        this.restaurant = res;
      });
  });
  }
}
