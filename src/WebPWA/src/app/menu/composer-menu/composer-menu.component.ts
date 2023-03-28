import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { MenuService } from '../menu.service';
import { Carte } from 'src/app/restaurant/carte';
import { MessageReservComponent } from 'src/app/message-reserv/message-reserv.component';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-composer-menu',
  templateUrl: './composer-menu.component.html',
  styleUrls: ['./composer-menu.component.css']
})
export class ComposerMenuComponent implements OnInit {

  menuPhoto: File;
  show: string;
  menu: FormGroup;
  products: any[];
  imgURL: any;
  card: Carte;
  allProductMenu: any[];
  submitted = false;
  disable = false;
  lete: any[] = [];
  

  constructor(public dialogRef: MatDialogRef<ComposerMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Restaurant,
    public menuService: MenuService,
    private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    public loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.getCard();
    this.menu = this.formBuilder.group({
      productsMenuPlat: ['', null],
      productsMenuEntree: ['', null],
      productsMenuDessert: ['', null],
      productsMenuBoisson: ['', null],
      productsMenuPatisserie: ['', null],
      MenuName: ['', Validators.required],
      MenuPrice: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });

    this.getProductByCardId();
  }

  affichDefault(): any[] {
    
    var shows =['Entree', 'Plat', 'Dessert', 'Boisson', 'Patisserie'];
    var prod: any[] = [];
    
    for (let s of shows){
      this.show = s;
      switch (s) {     
        case 'Entree':
          for (let p of this.products) {
            if (p.categorie == 0) {
              prod.push(p);
            }
          }
          break;
  
        case 'Plat':
          for (let p of this.products) {
            if (p.categorie == 2) {
              prod.push(p);
            }
          }
          break;
  
        case 'Dessert':
          for (let p of this.products) {
            if (p.categorie == 3) {
              prod.push(p);
            }
          }
          break;
  
        case 'Boisson':
          for (let p of this.products) {
            if (p.categorie == 1) {
              prod.push(p);
            }
          }
          break;
  
        case 'Patisserie':
          for (let p of this.products) {
            if (p.categorie == 4) {
              prod.push(p);
            }
          }
          break;
  
        default:
          break;
      }
      if(prod.length){
        break;
      }
    }
    return prod;
  }

  affichProduits(cat: string): any[] {
    this.show = '';
    this.show = cat;
    var prod: any[] = [];

    switch (cat) {
      case 'Entree':
        for (let p of this.products) {
          if (p.categorie == 0) {
            prod.push(p);
          }
        }
        break;

      case 'Plat':
        for (let p of this.products) {
          if (p.categorie == 2) {
            prod.push(p);
          }
        }
        break;

      case 'Dessert':
        for (let p of this.products) {
          if (p.categorie == 3) {
            prod.push(p);
          }
        }
        break;

      case 'Boisson':
        for (let p of this.products) {
          if (p.categorie == 1) {
            prod.push(p);
          }
        }
        break;

      case 'Patisserie':
        for (let p of this.products) {
          if (p.categorie == 4) {
            prod.push(p);
          }
        }
        break;

      default:
        break;
    }
    return prod;
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

   getCard(){
     this.menuService.getCardByRestaurantId(this.data.id).subscribe(
       (data)=>{
      this.card = data;
       }
     );
   }
  onSaveMenu(f: FormGroup) {
      this.disable = true;
      this.submitted = true;
      this.allProductMenu = [];

      for (let p of this.menu.controls.productsMenuEntree.value) {
        this.allProductMenu.push(p);
      }

      for (let p of this.menu.controls.productsMenuPlat.value) {
        this.allProductMenu.push(p);
      }

      for (let p of this.menu.controls.productsMenuDessert.value) {
        this.allProductMenu.push(p);
      }

      for (let p of this.menu.controls.productsMenuBoisson.value) {
        this.allProductMenu.push(p);
      }

      for (let p of this.menu.controls.productsMenuPatisserie.value) {
        this.allProductMenu.push(p);
      }

      if (this.allProductMenu.length) {
        if (this.validatorListProducts(this.allProductMenu)) {

          var productIds: any[] = [];
          for (let p of this.allProductMenu) {
            productIds.push(p.id);
          }

            if (this.menuPhoto) {
              this.menuService.addMenuRestaurant(this.card.id, this.menu.controls.MenuName.value, this.menu.controls.MenuPrice.value, this.menuPhoto, productIds).subscribe(res => {
                  this.openMessageDialog("le menu est ajouté avec succès", "success");
                  this.onClose();
              }, err => {
                console.log(err);
                this.disable = false;
              });
                
            } else {
              this.openMessageDialog("Photo menu obligatoire", "error");
              this.disable = false;
            }
        } else {
          this.openMessageDialog("Il faut au moins deux produits de catégorie différente", "error");
          this.disable = false;
        }
      } else {
        this.openMessageDialog("Sélectionner des produits", "error");
        this.disable = false;
      }
  }

  validatorListProducts(listProducts: any[]): Boolean {
    var product1 = listProducts[0];
    for (let p of listProducts) {
      if (p.categorie != product1.categorie) {
        return true;
      }
    }
    return false;
  }

  onNgModelChangePlat(event: any[]) { }

  onNgModelChangeEntree(event: any[]) { }

  onNgModelChangeDessert(event: any[]) { }

  onNgModelChangeBoisson(event: any[]) { }

  onNgModelChangePatisserie(event: any[]) { }



  onClose(): void {
    this.dialogRef.close();
  }

  getProductByCardId() {
    this.menuService.getCardByRestaurantId(this.data.id).subscribe((data) => {
      if (data) {
        this.menuService.getProductsByCardId(data.id).subscribe(res => {
          this.products = res;
          this.show = '';   
          this.affichDefault();
        });
      }
    });
  }

  openMessageDialog(message: any, type: any) {
    const dialogRef = this.dialog.open(MessageReservComponent, {
      data: {
        val: message,
        type: type
      },
      panelClass: 'myCss'
    });
    setTimeout(() => { dialogRef.close() }, 2500);
  }

}
