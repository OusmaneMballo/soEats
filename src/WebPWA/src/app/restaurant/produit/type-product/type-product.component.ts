import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produit } from '../produit';
import { ProduitService } from '../produit.service';
import { ProductType } from '../typeProduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.css']
})
export class TypeProductComponent implements OnInit {

  products:any[]=[];
  productTypes:ProductType[]=[];
  productsSelected:Produit[]=[]
  typeProductIdSelected: String;
  cardId: string;
  
  constructor(public typeProductRef: MatDialogRef<TypeProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public productService: ProduitService) { }

  ngOnInit(): void {
    this.getTypeProduct();
    this.cardId=this.data[0].cardId;
    for(let i=0; i<this.data.length; i++){
      this.products.push({bgColor:{'background-color':'#eeeff6'}, object:this.data[i], selected: false});
    }
  }

  getTypeProduct(){
    this.productService.getTypeProduct().subscribe((data)=>{
      this.productTypes=data;
    }, (error)=>{
      console.log(error)
    });
  }

  onSelected(product:any){
    this.products.forEach((elem)=>{
      if (elem.object==product) {
        if(elem.selected==false){
          elem.bgColor={'background-color':'#57596d'};
          this.productsSelected.push(elem.object);
          elem.selected=true;
        }
        else{

          elem.bgColor={'background-color':'#eeeff6'};
          elem.selected=false;
          this.productsSelected.splice(elem.object, 1);
        }
      }
    })
  }

  addTypeProduct(){
    console.log(this.productsSelected)
  }

  selectType($event: any){

    //Recuperation de l'id du jour séléctioné
    this.typeProductIdSelected=$event.target.value;
  }

  setType(){
    if(this.typeProductIdSelected!=null && this.cardId!=null){
      for(let j=0; j<this.productTypes.length; j++){

        if(this.productTypes[j].id==this.typeProductIdSelected){

          for(let i=0; i<this.productsSelected.length; i++){
            this.productsSelected[i].productType=this.productTypes[j];
          }

          let object={cardId:this.cardId, products:this.productsSelected}

          this.productService.updateTypeProducts(this.cardId,object).subscribe((success)=>{
            Swal.fire({
              width: '25rem',
              position: 'center',
              icon: 'success',
              title: 'Succes !', 
              showConfirmButton: false,
              timer: 2500
            });
          }, (error)=>{
            Swal.fire({
              width: '25rem',
              position: 'center',
              icon: 'error',
              title: 'Oups!... erreur', 
              showConfirmButton: false,
              timer: 2500
            });
          })
          break;
        }
      }
    }
    else{
      Swal.fire({
        width: '25rem',
        position: 'center',
        icon: 'error',
        title: 'Oups!... erreur', 
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

}
