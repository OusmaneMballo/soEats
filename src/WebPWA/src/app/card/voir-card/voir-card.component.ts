import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { Produit } from 'src/app/restaurant/produit/produit';
import { MenuService } from 'src/app/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { DetailsMenuComponent } from 'src/app/menu/details-menu/details-menu.component';
import { DetailsMenuClientComponent } from '../details-menu-client/details-menu-client.component';

@Component({
  selector: 'app-voir-card',
  templateUrl: './voir-card.component.html',
  styleUrls: ['./voir-card.component.css']
})
export class VoirCardComponent implements OnInit {

  categories = [
        { id : 6 , title : 'Menu'},
        { id : 0 , title : 'Entrée'},
        { id : 2 , title : 'Plat'},
        { id : 1 , title : 'Boisson'},
        { id : 4 , title : 'Patisserie'},
        { id : 3 , title : 'Dessert'},
    ];

        products: Produit[] = [];
        menus: any[];
        show: any = null ;
        idRestaurant: any;
        cardId: string;
        restaurant: Restaurant;
        productsEntree: Produit[] = [];
        productsPlat: Produit[] = [];
        productsBoisson: Produit[] = [];
        productsPatisserie: Produit[] = [];
        productsDessert: Produit[] = [];

    constructor(private serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute, public menuService: MenuService, public dialog: MatDialog) { }

    ngOnInit(): void {
      this.affichProduits();  
      this.scroll(this.show);
    }

    affichProduits() {
      
      this.idRestaurant = this.activatedRoute.snapshot.paramMap.get('slugId');
      this.serviceRestaurant.getRestaurantById(this.idRestaurant).subscribe(data => {
        this.restaurant = data;
        this.menuService.getCardByRestaurantId(this.restaurant.id).subscribe(card => {
          this.cardId = card.id;
            this.menuService.getProductsByCardId(this.cardId).subscribe(products => {
              this.products = products;   
              for(let c of this.categories){
                switch(c.title) { 
                  case 'Menu' : 
                            this.menuService.getMenus(this.cardId).subscribe(menus => {
                              this.menus = menus;
                            });
                      break;
        
                  case 'Entrée' : 
                      for(let p of this.products ){
                        if(p.categorie == c.id){
                          this.productsEntree.push(p);
                        }        
                      } 
                     break; 
                   
                  case 'Plat' : 
                      for(let p of this.products ){
                        if(p.categorie == c.id){
                          this.productsPlat.push(p);
                        }        
                      } 
                     break; 
          
                  case 'Dessert' : 
                      for(let p of this.products ){
                        if(p.categorie == c.id){
                          this.productsDessert.push(p);
                        }        
                      } 
                      break;
                      
                  case 'Boisson' : 
                      for(let p of this.products ){
                        if(p.categorie == c.id){
                          this.productsBoisson.push(p);
                        }        
                      } 
                      break;
                      
                  case 'Patisserie' : 
                      for(let p of this.products ){
                        if(p.categorie == c.id){
                          this.productsPatisserie.push(p);
                        }        
                      } 
                      break;
                   
                  default:  
                     break; 
                  }
              }                 
            });
        });
      }); 
     
    }

    scroll(el: HTMLElement) {
      this.show = el;
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
    }

    openDialogDetailsMenu(menu: any, cardId: string): void{
      this.dialog.open(DetailsMenuClientComponent, {
        data:  {menu, cardId},
        panelClass: 'padding-dialog-details-menu'
      });
    }
}
