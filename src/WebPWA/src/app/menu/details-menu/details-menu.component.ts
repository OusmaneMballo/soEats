import { Component, OnInit , Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Produit } from 'src/app/restaurant/produit/produit';
import { MenuService } from '../menu.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-details-menu',
  templateUrl: './details-menu.component.html',
  styleUrls: ['./details-menu.component.css']
})


export class DetailsMenuComponent implements OnInit {

  products : Produit[] = [];

  constructor(public dialogRef: MatDialogRef<DetailsMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public menuService: MenuService) { }

  ngOnInit(): void {
    for(let pId of this.data.menu.productIds){
      this.menuService.getProductByProductId(this.data.cardId, pId).subscribe( res => {
        this.products.push(res);
       });
    }   
  }


affichProduits(cat: string): Produit[] {
    
  var prod : Produit[] = [];

    switch(cat) { 
      case 'Entree' : 
          for(let p of this.products ){
            if(p.categorie == 0){
              prod.push(p);
            }        
          } 
         break; 
       
      case 'Plat' : 
          for(let p of this.products ){
            if(p.categorie == 2){
              prod.push(p);
            }        
          } 
         break; 

      case 'Dessert' : 
          for(let p of this.products ){
            if(p.categorie == 3){
              prod.push(p);
            }        
          } 
          break;
          
      case 'Boisson' : 
          for(let p of this.products ){
            if(p.categorie == 1){
              prod.push(p);
            }        
          } 
          break;
          
      case 'Patisserie' : 
          for(let p of this.products ){
            if(p.categorie == 4){
              prod.push(p);
            }        
          } 
          break;
       
      default:  
         break; 
        } 

    return prod;
    
}

onClose(): void {
  this.dialogRef.close();
}

}