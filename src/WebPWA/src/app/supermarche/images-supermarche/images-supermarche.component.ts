import { Component, OnInit, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { range } from 'rxjs';
import { AffichageImageComponent } from 'src/app/restaurant/menu-restaurant/affichage-image/affichage-image.component';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';
import { AjoutImagesSupermarcheComponent } from './ajout-images-supermarche/ajout-images-supermarche.component';
@Component({
  selector: 'app-images-supermarche',
  templateUrl: './images-supermarche.component.html',
  styleUrls: ['./images-supermarche.component.css']
})
export class ImagesSupermarcheComponent implements OnInit {

  @Input() supermarche: Supermarche;
  r = range(0,4);

  constructor(public dialog: MatDialog,  public serviceSupermarche: SupermarcheService) { 
  }

  ngOnInit(): void {
  }


  openDialogImages(): void {
    const dialogRef = this.dialog.open(AjoutImagesSupermarcheComponent, {
      data: this.supermarche.id,
      panelClass: 'padding-dialog-image'
    });
     dialogRef.afterClosed().subscribe(result => {
         this.serviceSupermarche.getSupermarcheById(this.supermarche.id).subscribe(res => {
           this.supermarche = res;
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
