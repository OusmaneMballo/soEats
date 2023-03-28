import { Component, OnInit } from '@angular/core';
import { AjoutHoraireComponent } from '../ajout-horaire/ajout-horaire.component';
import {MatDialog} from '@angular/material/dialog';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';
import { Address} from 'src/app/shared/address';
import {ActivatedRoute} from '@angular/router';
import { ModifModalComponent } from 'src/app/modif-modal/modif-modal.component';
import { Injectable } from '@angular/core';
import { OptionPaiementComponent } from '../option-paiement/option-paiement.component';
import { AjoutPromoComponent } from 'src/app/promotion/ajout-promo/ajout-promo.component';
@Injectable({
  providedIn: 'root'
  })

@Component({
  selector: 'app-page-accueil-restaurant',
  templateUrl: './page-accueil-restaurant.component.html',
  styleUrls: ['./page-accueil-restaurant.component.css']
})
export class PageAccueilRestaurantComponent implements OnInit {

  restaurant: Restaurant;
  idRestaurant: any;

  constructor(public dialog: MatDialog, public serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.getRestaurant();
  }
  
  public getRestaurant(){
    this.restaurant=new Restaurant();
    this.idRestaurant = this.activatedRoute.snapshot.paramMap.get('slugId');
      this.serviceRestaurant.getRestaurantById(this.idRestaurant).subscribe(data => {
        this.restaurant = data;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AjoutHoraireComponent,
       {
         panelClass: 'my-class',
         data: this.restaurant
        });
    dialogRef.afterClosed().subscribe(result => {
      
      if(localStorage.getItem("horaireIsAdd")=='1'){
        window.location.reload();
        localStorage.removeItem("horaireIsAdd");
      }
    });
  }

  openDialogAjoutPromo(): void{
    const promoModalRef =this.dialog.open(AjoutPromoComponent, {
      data: this.restaurant,
      panelClass: 'panelAddPromo'
    });
  }

  modifModal(restauModif: Restaurant, title: any){
    const modifModalRef = this.dialog.open(ModifModalComponent, {
      data: {restauModif, title},
      panelClass: 'panelModifModal'
    }); 
    modifModalRef.afterClosed().subscribe(result => {
      this.getRestaurant();
    });
  }

}

