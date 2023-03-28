import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModifModalComponent } from 'src/app/modif-modal/modif-modal.component';
import { OptionPaiementComponent } from 'src/app/restaurant/option-paiement/option-paiement.component';
import { ModifModalSupermarcheComponent } from '../modif-modal-supermarche/modif-modal-supermarche.component';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';

@Component({
  selector: 'app-contact-supermarche',
  templateUrl: './contact-supermarche.component.html',
  styleUrls: ['./contact-supermarche.component.css']
})

export class ContactSupermarcheComponent implements OnInit {

  @Input() supermarche: Supermarche;

  constructor(public serviceSupermarche: SupermarcheService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  modifModal(supermarcheModif: any, title: any){
    const modifModalRef = this.dialog.open(ModifModalSupermarcheComponent, {
      data: {supermarcheModif, title},
      panelClass: 'panelModifModal'
    }); 
    modifModalRef.afterClosed().subscribe(result => {
      this.serviceSupermarche.getSupermarcheById(this.supermarche.id).subscribe(res => {
        this.supermarche = res;
      }); 
  });
  }

  modifPaiementModal(supermarcheModif: Supermarche){
    const modifPaiementModalRef = this.dialog.open(OptionPaiementComponent, {
      data: supermarcheModif,
      panelClass: 'panelModifPaiementModal'
    }); 
    modifPaiementModalRef.afterClosed().subscribe(result => {
      this.serviceSupermarche.getSupermarcheById(this.supermarche.id).subscribe(res => {
        this.supermarche = res;
      });
    });
  }

}

