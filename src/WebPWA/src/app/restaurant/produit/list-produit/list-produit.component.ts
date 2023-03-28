import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../restaurant';
import { RestaurantService } from '../../restaurant.service';
import { ProduitService } from 'src/app/restaurant/produit/produit.service';
import { Produit } from '../produit';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/message/message.component';
import { EditProduitComponent } from '../edit-produit/edit-produit.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { TypeProductComponent } from '../type-product/type-product.component';
import { AddTypeComponent } from '../add-type/add-type.component';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {
  restaurant: Restaurant;
  idRestaurant: any;
  produits: Produit[]=[];
  cp: number=1;
  searchText: any;
  categorie: any = "Entree";

  control = new FormControl();
  productFilter: Produit[] = [];
  filteredProduct: Observable<Produit[]>;
  prod: Produit[]=[];

  categories: FormGroup;

  constructor(
    public serviceRestaurant: RestaurantService,
    public produitService: ProduitService,
     private activatedRoute: ActivatedRoute,
     public dialog: MatDialog,
     fb: FormBuilder,
     public loaderService:LoaderService
     ) {
      this.categories = fb.group({
        categorie: ['Tous', null],
      });
      }



  ngOnInit(): void {
    this.getProduits();
    this.filteredProduct = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Produit[] {
    const filterValue = this._normalizeValue(value);
    return this.productFilter.filter(produit=>this._normalizeValue(produit.name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getProduits(){
    this.restaurant=new Restaurant();
    this.idRestaurant = this.activatedRoute.snapshot.paramMap.get('slugId');
      this.serviceRestaurant.getRestaurantById(this.idRestaurant).subscribe((data)=> {
        this.restaurant = data;

        this.produitService.getCarteByIdRestaurant(data.id).subscribe((response)=>{
            this.produitService.getProduitsByIdCarte(response.id).subscribe((data)=>{
              this.produits=data;
              this.changeEvent(this.categories.value.categorie);
              this.productFilter=this.produits;
              
            });
        },
        (error)=>{
          
        })
      });
      return this.produits;
  }

  changeEvent(categorie: any){

    this.prod = [];

   switch(categorie) { 
        case 'Tous' : 
        for(let p of this.produits ){
            this.prod.push(p);       
        } 
        break; 

      case 'Entree' : 
          for(let p of this.produits ){
            if(p.categorie == 0){
              this.prod.push(p);
            }        
          } 
       break; 
     
    case 'Plat' : 
        for(let p of this.produits ){
          if(p.categorie == 2){
            this.prod.push(p);
          }        
        } 
       break; 

    case 'Dessert' : 
        for(let p of this.produits ){
          if(p.categorie == 3){
            this.prod.push(p);
          }        
        } 
        break;
        
    case 'Boisson' : 
        for(let p of this.produits ){
          if(p.categorie == 1){
            this.prod.push(p);
          }        
        } 
        break;
        
    case 'Patisserie' : 
        for(let p of this.produits ){
          if(p.categorie == 4){
            this.prod.push(p);
          }        
        } 
        break;
     
    default:  
       break; 
      } 
    
  }

  suppressionProduitByIdProduitAndIdCard(produit: Produit){
      this.produitService.deleteProduitByIdCarteAndIdProduit(produit.cardId, produit.id).subscribe((response)=>{
        this.openMessageDialog("successDeleteProduit");
        this.getProduits();
      },
      (error)=>{
        this.openMessageDialog("errorDeleteProduit");
      }
      );
  }

  openDialogTypeProduct(products: any[]){
    const dialogRef = this.dialog.open(TypeProductComponent, {
      data: products,
      panelClass: 'panelTypeProductModal'
    });
  }
  openDialogAddTypeProduct(){
    const dialogRef = this.dialog.open(AddTypeComponent, {
      panelClass: 'panelAddTypeProductModal'
    });
  }

  openDialogEditProduit(produit: Produit): void{
    const dialogRef = this.dialog.open(EditProduitComponent, {
      data: produit,
      panelClass: 'padding-dialog-edit-produit'
    });
     dialogRef.afterClosed().subscribe(result => {
         this.getProduits();
     });
  }

  //Fonction pour declancher la boite de dialog
  openMessageDialog(message:any) {
    const dialogRef= this.dialog.open(MessageComponent, {
      data: {
        val: message
      },
      panelClass: 'myCss'
    });
    setTimeout(()=>{dialogRef.close()}, 2500);
  }

}
