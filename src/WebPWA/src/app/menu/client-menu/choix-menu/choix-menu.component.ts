import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produit } from 'src/app/restaurant/produit/produit';
import { Menu } from '../../menu';

@Component({
  selector: 'app-choix-menu',
  templateUrl: './choix-menu.component.html',
  styleUrls: ['./choix-menu.component.css']
})
export class ChoixMenuComponent implements OnInit {

  produitForm: FormGroup;
  boissons: Produit[]=[];
  entrees: Produit[]=[];
  patisseries: Produit[]=[];
  desserts: Produit[]=[];
  plats: Produit[]=[];

  error="";

  constructor(
    public dialogRef: MatDialogRef<ChoixMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    
      let objControl={
        entre: ['', Validators.nullValidator],
        boisson: ['', Validators.nullValidator],
        plat: ['', Validators.nullValidator],
        dessert: ['', Validators.nullValidator],
        patisserie: ['', Validators.nullValidator]
      };

    for(let i=0; i<this.data.products.length; i++){
      if(this.data.products[i].categorie==0){
        if(objControl.entre[1]=== Validators.nullValidator){
          objControl.entre[1]=Validators.required;
        }
        this.entrees.push(this.data.products[i]);
      }
      else{
        if(this.data.products[i].categorie==1){
          if(objControl.boisson[1]=== Validators.nullValidator){
            objControl.boisson[1]=Validators.required;
          }
          this.boissons.push(this.data.products[i]);
        }
        else{
          if(this.data.products[i].categorie==2){
            if(objControl.plat[1]=== Validators.nullValidator){
              objControl.plat[1]=Validators.required;
            }
            this.plats.push(this.data.products[i]);
          }
          else{
            if(this.data.products[i].categorie==3){
              if(objControl.dessert[1]=== Validators.nullValidator){
                objControl.dessert[1]=Validators.required;
              }
              this.desserts.push(this.data.products[i]);
            }
            else{
              if(this.data.products[i].categorie==4){
                this.patisseries.push(this.data.products[i]);
                if(objControl.patisserie[1]=== Validators.nullValidator){
                  objControl.patisserie[1]=Validators.required;
                }
              }
            }
          }
        }
      }
    }
    this.produitForm=this.fb.group(objControl);
  }

  addPanier(data: Menu){

    if(this.produitForm.valid===true){
      let menu=new Menu();

      if(data!=null){
        menu.id=data.id;
        menu.cardId=data.cardId;
        menu.imageUrl=data.imageUrl;
        menu.name=data.name;
        menu.price=data.price;
        menu.products=[];
        
        if(this.produitForm.controls["entre"].value){
          let produit=this.findProducrById(data.products, this.produitForm.controls["entre"].value);
          if(produit!==null){
            menu.products.push(produit);
          }
        }

        if(this.produitForm.controls["boisson"].value){
          let produit=this.findProducrById(data.products, this.produitForm.controls["boisson"].value);
          if(produit!==null){
            menu.products.push(produit);
          }
        }

        if(this.produitForm.controls["plat"].value){
          let produit=this.findProducrById(data.products, this.produitForm.controls["plat"].value);
          if(produit!==null){
            menu.products.push(produit);
          }
        }

        if(this.produitForm.controls["dessert"].value){
          let produit=this.findProducrById(data.products, this.produitForm.controls["dessert"].value);
          if(produit!==null){
            menu.products.push(produit);
          }
        }

        if(this.produitForm.controls["patisserie"].value){
          let produit=this.findProducrById(data.products, this.produitForm.controls["patisserie"].value);
          if(produit!==null){
            menu.products.push(produit);
          }
        }

      }

      if(menu.products[0]!=null){

        this.dialogRef.close(menu);

      }
      else{
        this.dialogRef.close(null);
      }
    }
    else{
      this.error="Invalide";
    }
    
  }

  findProducrById(produits:Produit[], id:string){

    for(let i=0; i<produits.length; i++){
      if(produits[i].id==id){
        return produits[i];
      }
    }

    return null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
