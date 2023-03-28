import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ModifMenuComponent } from '../modif-menu/modif-menu.component';
import { MatDialog } from '@angular/material/dialog';
// import { DetailsMenuComponent } from '../details-menu/details-menu.component';
import { RayonService } from '../../services/rayon.service';
import { SupermarcheService } from '../../services/supermarche.service';
import { Supermarche } from '../../supermarche';
import { ListProduitRayonComponent } from '../list-produit-rayon/list-produit-rayon.component';

@Component({
  selector: 'app-list-rayons',
  templateUrl: './list-rayons.component.html',
  styleUrls: ['./list-rayons.component.css']
})
export class ListRayonsComponent implements OnInit {

  supermarcheSlugId: any;
  supermarche: Supermarche;
  rayons: any[] = [];
  cardId: string;
  searchText: any;
  constructor(private router: Router, public rayonService: RayonService, public serviceSupermarche: SupermarcheService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSupermarche();
  }

  getSupermarche() {
    this.supermarcheSlugId = this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceSupermarche.getSupermarketBySlugId(this.supermarcheSlugId).subscribe(data => {
      this.supermarche = data;
      this.rayonService.getRayons(this.supermarche.id).subscribe(data => {
        this.rayons = data;
      });
    });
  }

  supprimerRayon(rayon : any){
    this.rayonService.deleteRayon(rayon.id, rayon.superMarketId).subscribe(res => {
      this.getSupermarche();
    });
  }

  openDialogModifMenu(menu: any, cardId: string): void {
    // const dialogRef = this.dialog.open(ModifMenuComponent, {
    //   data: { menu, cardId },
    //   panelClass: 'padding-dialog-composer-menu'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getSupermarche();
    // });
  }

  openDialogDetailsRayon(rayon: any, supermarcheId: string): void {
    this.dialog.open(ListProduitRayonComponent, {
      data: { rayon, supermarcheId },
      panelClass: 'padding-dialog-details-menu'
    });
  }

}
