import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RayonService } from '../../services/rayon.service';

@Component({
  selector: 'app-list-produit-rayon',
  templateUrl: './list-produit-rayon.component.html',
  styleUrls: ['./list-produit-rayon.component.css']
})
export class ListProduitRayonComponent implements OnInit {

  products: any[] = [];
  cp: number=1;
  searchText: any;

  constructor(public dialogRef: MatDialogRef<ListProduitRayonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public rayonService: RayonService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.rayonService.getRayonProducts(this.data.supermarcheId, this.data.rayon.id).subscribe(data => {
        this.products = data;
    });
  }

  supprimerRayon(produit: any){
    this.rayonService.deleteRayonProduct(produit.superMarketId, produit.sectionId, produit.id).subscribe(res => {
      this.getProducts();
    });
  }

}
