import { Component, OnInit } from '@angular/core';
import { AjoutHoraireComponent } from 'src/app/restaurant/ajout-horaire/ajout-horaire.component';
import {MatDialog} from '@angular/material/dialog';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { Address} from 'src/app/shared/address';
import {ActivatedRoute} from '@angular/router';
import { ModifModalComponent } from 'src/app/modif-modal/modif-modal.component';
import { Injectable } from '@angular/core';
import { AjoutPromoComponent } from 'src/app/promotion/ajout-promo/ajout-promo.component';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';
import { AjoutHoraireSupermarcheComponent } from '../ajout-horaire-supermarche/ajout-horaire-supermarche.component';

@Component({
  selector: 'app-page-accueil-supermarche',
  templateUrl: './page-accueil-supermarche.component.html',
  styleUrls: ['./page-accueil-supermarche.component.css']
})

export class PageAccueilSupermarcheComponent implements OnInit {

  restaurant: Restaurant;
  supermarche: Supermarche;
  idSupermarche: any;

  constructor(public dialog: MatDialog, public serviceRestaurant: RestaurantService,public serviceSupermarche: SupermarcheService, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.getSupermarche();
  }
  
  public getSupermarche(){
    this.supermarche=new Supermarche();
    this.idSupermarche = this.activatedRoute.snapshot.paramMap.get('slugId');
      this.serviceSupermarche.getSupermarketBySlugId(this.idSupermarche).subscribe(data => {
        this.supermarche = data;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AjoutHoraireSupermarcheComponent,
       {
         panelClass: 'my-class',
         data: this.supermarche
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
      data: this.supermarche,
      panelClass: 'panelAddPromo'
    });
  }

  modifModal(restauModif: Supermarche, title: any){
    const modifModalRef = this.dialog.open(ModifModalComponent, {
      data: {restauModif, title},
      panelClass: 'panelModifModal'
    }); 
    modifModalRef.afterClosed().subscribe(result => {
      this.getSupermarche();
    });
  }

}


