import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/menu/menu';
import { Produit } from 'src/app/restaurant/produit/produit';

@Component({
  selector: 'app-show-products-menu',
  templateUrl: './show-products-menu.component.html',
  styleUrls: ['./show-products-menu.component.css']
})
export class ShowProductsMenuComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ShowProductsMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu) { }

  ngOnInit(): void {

  }

affichProduits(cat: string): any[] {
    
  var prod : any[] = [];

    switch(cat) { 
      case 'Entree' : 
          for(let p of this.data.products ){
            if(p.categorie == 0){
              prod.push(p);
            }        
          } 
         break; 
       
      case 'Plat' : 
          for(let p of this.data.products ){
            if(p.categorie == 2){
              prod.push(p);
            }        
          } 
         break; 

      case 'Dessert' : 
          for(let p of this.data.products ){
            if(p.categorie == 3){
              prod.push(p);
            }        
          } 
          break;
          
      case 'Boisson' : 
          for(let p of this.data.products ){
            if(p.categorie == 1){
              prod.push(p);
            }        
          } 
          break;
          
      case 'Patisserie' : 
          for(let p of this.data.products ){
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
