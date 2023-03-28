import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { MenuService } from '../menu.service';
import { Carte } from 'src/app/restaurant/carte';
import { Produit } from 'src/app/restaurant/produit/produit';
import { MessageReservComponent } from 'src/app/message-reserv/message-reserv.component';
import { Menu } from '../menu';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { LoaderService } from 'src/app/loader/loader.service';


@Component({
  selector: 'app-modif-menu',
  templateUrl: './modif-menu.component.html',
  styleUrls: ['./modif-menu.component.css']
})
export class ModifMenuComponent implements OnInit {

  menuPhoto: File;
  show : string;
  menu: FormGroup;
  products: Produit[] = [];
  imgURL: any;
  card: Carte;
  allProductMenu: any[];
  submitted = false;
  restaurantSlugId: any;
  restaurant: Restaurant;

  productEntree:Produit[] = [];
  productPlat: Produit[] = [];
  productDessert: Produit[] = [];
  productBoisson: Produit[] = [];
  productPatisserie: Produit[] = [];

  productMenuEntree:Produit[] = [];
  productMenuPlat: Produit[] = [];
  productMenuDessert: Produit[] = [];
  productMenuBoisson: Produit[] = [];
  productMenuPatisserie: Produit[] = [];

  constructor(public dialogRef: MatDialogRef<ModifMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public menuService: MenuService, 
    private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    public serviceRestaurant: RestaurantService,
    public loaderService: LoaderService) { 
    }

  ngOnInit(): void {
    this.menu = this.formBuilder.group({
      MenuName: [this.data.menu.name, Validators.required],
      MenuPrice: [this.data.menu.price, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
    
    this.getProductByCardId();    
    this.imgURL = this.data.menu.imageUrl;
  }


  affichProduitsMenu(productsMenu: string[]){

    for(let pId of productsMenu ){
      for(let p of this.products) {   
        if(pId == p.id ){
          switch (p.categorie) {
            case 0:
              this.productMenuEntree.push(p);
              break;
      
            case 2:
              this.productMenuPlat.push(p);
              break;
      
            case 3:
              this.productMenuDessert.push(p);
              break;
      
            case 1:
              this.productMenuBoisson.push(p);
              break;
      
            case 4:
              this.productMenuPatisserie.push(p);
              break;
      
            default:
              break;
          }            
        }    
    } 
  }

    this.menu = this.formBuilder.group({
      productsMenuPlat: [this.productMenuPlat, null],
      productsMenuEntree: [this.productMenuEntree, null],
      productsMenuDessert: [this.productMenuDessert, null],
      productsMenuBoisson: [this.productMenuBoisson, null],
      productsMenuPatisserie: [this.productMenuPatisserie, null],
      MenuName: [this.data.menu.name, Validators.required],
      MenuPrice: [this.data.menu.price, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
}

  affichDefault() {
    this.show = '';
    if(this.productEntree.length){
      this.show = 'Entree';
    }else if(this.productPlat.length){
      this.show = 'Plat';
    }else if(this.productDessert.length){
      this.show = 'Dessert';
    }else if(this.productBoisson.length){
      this.show = 'Boisson';
    }else if(this.productPatisserie.length){
      this.show = 'Patisserie';
    }
    
  }


  getProductByCardId(){
    this.menuService.getMenusByMenuId(this.data.cardId, this.data.menu.id).subscribe(res => {
      this.menuService.getProductsByCardId(this.data.cardId).subscribe( res => {
        this.products =res;
        this.affichProduits();
        this.affichProduitsMenu(this.data.menu.productIds);
        this.affichDefault();
      });
    });    
  }

  selectedProduitPatisserie(p: any){
    for(let pMenu of this.menu.controls.productsMenuDessert.value ){
      if(p.id === pMenu.id){
        return true;
      }    
    }
    return false;
  }

  selectedProduitBoisson(p: any){
    for(let pMenu of this.menu.controls.productsMenuDessert.value ){
      if(p.id === pMenu.id){
        return true;
      }    
    }
    return false;
  }

  selectedProduitDessert(p: any){
    for(let pMenu of this.menu.controls.productsMenuDessert.value ){
      if(p.id === pMenu.id){
        return true;
      }    
    }
    return false;
  }
  
  selectedProduitPlat(p: any){
    for(let pMenu of this.menu.controls.productsMenuPlat.value ){
      if(p.id === pMenu.id){
        return true;
      }    
    }
    return false;
  }

  selectedProduitEntree(p: any){
  
          for(let pMenu of this.menu.controls.productsMenuEntree.value ){
            if(p.id === pMenu.id){
              return true;
            }    
          }  
       return false;
  }


  affichProduits(){
            for(let p of this.products ){
                switch (p.categorie) {
                  case 0:
                    this.productEntree.push(p);
                    break;
            
                  case 2:
                    this.productPlat.push(p);
                    break;
            
                  case 3:
                    this.productDessert.push(p);
                    break;
            
                  case 1:
                    this.productBoisson.push(p);
                    break;
            
                  case 4:
                    this.productPatisserie.push(p);
                    break;
            
                  default:
                    break;
                }           
            } 
  }

  showCategorie(cat: string){
    this.show = cat;
  }

   preview(files: any) {
     if (files.length === 0)
       return;
      
       this.menuPhoto = files[0];
 
     var reader = new FileReader();
     reader.readAsDataURL(this.menuPhoto); 
     reader.onload = (_event) => { 
       this.imgURL = reader.result; 
     }
   }

   
  onSaveMenu(f: FormGroup){

    this.submitted = true;
    this.allProductMenu = [];

    if (this.menu.invalid){
      return;
    }

      for(let p of this.menu.controls.productsMenuEntree.value){
        this.allProductMenu.push(p);
      }

      for(let p of this.menu.controls.productsMenuPlat.value){
        this.allProductMenu.push(p);
      }

      for(let p of this.menu.controls.productsMenuDessert.value){
        this.allProductMenu.push(p);
      }

      for(let p of this.menu.controls.productsMenuBoisson.value){
        this.allProductMenu.push(p);
      }

      for(let p of this.menu.controls.productsMenuPatisserie.value){
        this.allProductMenu.push(p);
      }
    
     if(this.allProductMenu.length){
        if(this.validatorListProducts(this.allProductMenu)){

              var productIds : any[] = [];
              for(let p of this.allProductMenu){
                productIds.push(p.id);
              }
              
              this.menuService.updateMenuRestaurant(this.data.cardId, this.data.menu.id, this.menu.controls.MenuName.value, this.menu.controls.MenuPrice.value, this.menuPhoto, productIds).subscribe(res => {
                this.openMessageDialog("le menu a été modifié avec succès", "success"); 
                this.onClose(); 
                   
              }, err => {
                  console.log(err);
              });
        } else{
          this.openMessageDialog("Il faut au moins deux produits de catégorie différente", "error");
        }
     }else{
      this.openMessageDialog("Sélectionner des produits", "error");
     }                    
  }


  validatorListProducts(listProducts: any[]): Boolean{
              var product1 = listProducts[0];
                 for(let p of listProducts ){
                    if(p.categorie != product1.categorie){
                      return true;
                    }
                }

            return false;
  }

  onNgModelChangePlat(event: any[]){}

  onNgModelChangeEntree(event: any[]){}

  onNgModelChangeDessert(event: any[]){}

  onNgModelChangeBoisson(event: any[]){}

  onNgModelChangePatisserie(event: any[]){}



  onClose(): void {
    this.dialogRef.close();
  }


    openMessageDialog(message:any, type: any) {
      const dialogRef= this.dialog.open(MessageReservComponent, {
        data: {
          val: message,
          type: type
        },
        panelClass: 'myCss'
      });
      setTimeout(()=>{dialogRef.close()}, 2500);
    }

}
