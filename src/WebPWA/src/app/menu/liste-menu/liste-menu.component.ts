import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { MenuService } from '../menu.service';
import { ModifMenuComponent } from '../modif-menu/modif-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailsMenuComponent } from '../details-menu/details-menu.component';

@Component({
  selector: 'app-liste-menu',
  templateUrl: './liste-menu.component.html',
  styleUrls: ['./liste-menu.component.css']
})
export class ListeMenuComponent implements OnInit {

  restaurantSlugId : any;
  restaurant: Restaurant;
  menus: any[] = [];
  cardId: string;
  searchText: any;
  constructor(private router: Router, public menuService: MenuService, public serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRestaurant();
  }


  getRestaurant(){
    this.restaurantSlugId = this.activatedRoute.snapshot.paramMap.get('slugId');
      this.serviceRestaurant.getRestaurantById(this.restaurantSlugId).subscribe(data => {
        this.restaurant = data;
        this.menuService.getCardByRestaurantId(this.restaurant.id).subscribe(card => {
          this.cardId = card.id;
          this.menuService.getMenus(this.cardId).subscribe(res => {
                 this.menus = res;
          });
        });
      });
  }

  deleteMenu(menuId : string): void{
    this.menuService.deleteMenuRestaurant(this.cardId, menuId).subscribe(res => { 
      this.getRestaurant();
     }, err => {
       console.log(err);
    });
}

  openDialogModifMenu(menu: any, cardId: string): void{
    const dialogRef = this.dialog.open(ModifMenuComponent, {
      data:  {menu, cardId},
      panelClass: 'padding-dialog-composer-menu'
    });
     dialogRef.afterClosed().subscribe(result => {
         this.getRestaurant();
     });
  }

  openDialogDetailsMenu(menu: any, cardId: string): void{
    this.dialog.open(DetailsMenuComponent, {
      data:  {menu, cardId},
      panelClass: 'padding-dialog-details-menu'
    });
  }
  
}
