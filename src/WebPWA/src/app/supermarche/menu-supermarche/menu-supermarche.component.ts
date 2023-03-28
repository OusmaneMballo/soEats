import { Component, Input, OnInit } from '@angular/core';
// import { Restaurant } from '../restaurant';
import { MatDialog } from '@angular/material/dialog';
// import { AjoutMenuRestaurantComponent } from './ajout-menu-restaurant/ajout-menu-restaurant.component';

// import { AffichageImageComponent } from './affichage-image/affichage-image.component';
// import { AjoutProduitComponent } from '../produit/ajout-produit/ajout-produit.component';
import { ComposerMenuComponent } from 'src/app/menu/composer-menu/composer-menu.component';
import { LoaderService } from 'src/app/loader/loader.service';
import { Supermarche } from '../supermarche';
import { AjoutRayonComponent } from '../ajout-rayon/ajout-rayon.component';
import { AjoutCategorieComponent } from '../ajout-categorie/ajout-categorie.component';
import { AjoutProduitSupermarcheComponent } from '../ajout-produit-supermarche/ajout-produit-supermarche.component';

@Component({
  selector: 'app-menu-supermarche',
  templateUrl: './menu-supermarche.component.html',
  styleUrls: ['./menu-supermarche.component.css']
})
export class MenuSupermarcheComponent implements OnInit {

  @Input() supermarche: Supermarche;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialogAjoutRayon(): void{
    this.dialog.open(AjoutRayonComponent, {
      data: this.supermarche,
      panelClass: 'padding-dialog-menu-rayon'
    });
  }
  openDialogAjoutCategorie(): void{
    this.dialog.open(AjoutCategorieComponent, {
      data: this.supermarche,
      panelClass: 'padding-dialog-menu-categorie'
    });
  }
  openDialogAjoutProduit(): void{
    this.dialog.open(AjoutProduitSupermarcheComponent, {
      data: this.supermarche,
      panelClass: 'padding-dialog-menu'
    });
  }
}

