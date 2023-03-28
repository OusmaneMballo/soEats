import { Component, OnInit, Input} from '@angular/core';
import { AffichageImageComponent } from '../menu-restaurant/affichage-image/affichage-image.component';
import { Restaurant } from '../restaurant';
import { MatDialog } from '@angular/material/dialog';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AjourImagesRestaurantComponent } from './ajour-images-restaurant/ajour-images-restaurant.component';
import { range } from 'rxjs';
import { RestaurantService } from '../restaurant.service';
@Component({
  selector: 'app-images-restaurant',
  templateUrl: './images-restaurant.component.html',
  styleUrls: ['./images-restaurant.component.css']
})
export class ImagesRestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;
  r = range(0,4);

  constructor(public dialog: MatDialog,  public serviceRestaurant: RestaurantService) { 
  }

  ngOnInit(): void {
  }


  openDialogImages(): void {
    const dialogRef = this.dialog.open(AjourImagesRestaurantComponent, {
      data: this.restaurant.id,
      panelClass: 'padding-dialog-image'
    });
     dialogRef.afterClosed().subscribe(result => {
         this.serviceRestaurant.getRestaurantById(this.restaurant.id).subscribe(res => {
           this.restaurant = res;
         });
     });
  }

  openDialogImage(img: any): void {
    this.dialog.open(AffichageImageComponent, {
      data: img,
      panelClass: 'padding-dialog'
    });
    
  }

}
