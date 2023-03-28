import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import { DetailsMenuClientComponent } from 'src/app/card/details-menu-client/details-menu-client.component';
import { MenuService } from 'src/app/menu/menu.service';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { CommandeService } from '../commande.service';
import { ShowProductsMenuComponent } from '../show-products-menu/show-products-menu.component';


@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrls: ['./details-commande.component.css']
})
export class DetailsCommandeComponent implements OnInit {
  restaurant: Restaurant;
  idRestaurant: any;
  idCommande: any;
  commande: any;
  cardId: any;
  total=0;
  
  constructor(public menuService: MenuService, public serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute, public commandeService: CommandeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRestaurantBySlugId();
  }

  getRestaurantBySlugId(){
    
    this.total = 0;
    this.idRestaurant = this.activatedRoute.snapshot.paramMap.get('slugId');
    if(this.idRestaurant!=null){
      this.serviceRestaurant.getRestaurantById(this.idRestaurant).subscribe(data => {
        this.restaurant = data;
        this.idCommande = this.activatedRoute.snapshot.paramMap.get('commandeId');
        this.commandeService.getCommandesByIdcommande(this.restaurant.id, this.idCommande).subscribe(commande => {
          this.commande = commande;
          console.log(commande)
          for(let orderProduct of this.commande.orderProductItems){
               this.total+=orderProduct.product.price * orderProduct.quantity;
          }
          for(let orderMenu of this.commande.orderMenuItems){
               this.total+=orderMenu.menu.price * orderMenu.quantity;
          }
        });
      });
    }
    else{
      let urlClient= this.activatedRoute.snapshot.paramMap.get('commandeId');
      let slugIdRestaurant = this.activatedRoute.snapshot.paramMap.get('slugId');
      if(urlClient!=null && slugIdRestaurant!=null){
        this.serviceRestaurant.getRestaurantById(slugIdRestaurant).subscribe(data => {
          this.restaurant = data;
          this.idCommande = urlClient;
          this.commandeService.getCommandesByIdcommande(this.restaurant.id, urlClient).subscribe(commande => {
            this.commande = commande;
            for(let orderProduct of this.commande.orderProductItems){
              this.total+=orderProduct.product.price * orderProduct.quantity;
            }
            for(let orderMenu of this.commande.orderMenuItems){
              this.total+=orderMenu.menu.price * orderMenu.quantity;
            }
          });
        });
      }
    }
    
  }

  showMenu(menu: any): void{
    this.dialog.open(ShowProductsMenuComponent, {
      data:  menu,
      panelClass: 'padding-dialog-details-menu'
    });
  }
}
