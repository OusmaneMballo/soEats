import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';
import { ModifModalSupermarcheComponent } from '../modif-modal-supermarche/modif-modal-supermarche.component';

@Component({
  selector: 'app-description-supermarche',
  templateUrl: './description-supermarche.component.html',
  styleUrls: ['./description-supermarche.component.css']
})

export class DescriptionSupermarcheComponent implements OnInit {

  @Input() supermarche: Supermarche;

  constructor(public serviceSupermarche: SupermarcheService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modifModalDesc(supermarcheModif: any, title: any){
    const modifModalRef = this.dialog.open(ModifModalSupermarcheComponent, {
      data: {supermarcheModif, title},
      panelClass: 'panelModifModalDesc'
    }); 
    modifModalRef.afterClosed().subscribe(result => {
      this.serviceSupermarche.getSupermarcheById(this.supermarche.id).subscribe(res => {
        this.supermarche = res;
      });
  });
  }

}
