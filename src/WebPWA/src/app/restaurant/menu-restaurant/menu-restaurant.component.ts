import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { MatDialog } from '@angular/material/dialog';
import { AjoutMenuRestaurantComponent } from './ajout-menu-restaurant/ajout-menu-restaurant.component';

import { AffichageImageComponent } from './affichage-image/affichage-image.component';
import { AjoutProduitComponent } from '../produit/ajout-produit/ajout-produit.component';
import { ComposerMenuComponent } from 'src/app/menu/composer-menu/composer-menu.component';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-menu-restaurant',
  templateUrl: './menu-restaurant.component.html',
  styleUrls: ['./menu-restaurant.component.css']
})
export class MenuRestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogAjoutProduit(): void{
    this.dialog.open(AjoutProduitComponent, {
      data: this.restaurant,
      panelClass: 'padding-dialog-menu'
    });
  }

  openDialogComposerMenu(): void{
    this.dialog.open(ComposerMenuComponent, {
      data: this.restaurant,
      panelClass: 'padding-dialog-composer-menu'
    });
  }

  openDialog(): void {
    // this.dialog.open(AjoutMenuRestaurantComponent, {
    //   data: this.restaurant,
    //   panelClass: 'padding-dialog-menu'
    // });
  }

  openDialogImage(img: any): void {
    this.dialog.open(AffichageImageComponent, {
      data: img,
      panelClass: 'padding-dialog'
    });
  }

}
