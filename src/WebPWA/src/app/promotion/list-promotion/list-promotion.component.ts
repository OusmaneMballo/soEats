import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/commande/commande.service';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { AjoutPromoComponent } from '../ajout-promo/ajout-promo.component';
import { EditerPromoComponent } from '../editer-promo/editer-promo.component';
import { Promotion } from '../promotion';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {

  type = "mobile";
  panelOpenState: boolean;
  cp: number=1;
  cp1: number=1;
  restaurant: Restaurant;
  promotions: Promotion[]=[];
  promotionsHold: Promotion[]=[];
  promotionsCurrent: Promotion[]=[];
  restaurantSlugId: any;
  searchCmdAtraiter: any;
  searchCmdTraiter: any;
  dateToDay: Date;

  constructor(
    public router: Router,
    public serviceRestaurant: RestaurantService,
    private activatedRoute: ActivatedRoute,
    public commandeService: CommandeService,
    public promotionService: PromotionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPromotionsByRestaurant();
    this.panelOpenState = false;
    this.dateToDay=new Date();
  }


  getPromotionsByRestaurant(){
    this.restaurantSlugId = this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceRestaurant.getRestaurantById(this.restaurantSlugId).subscribe(data => {
      this.restaurant = data;
      this.promotionService.getPromotionsRestaurant(this.restaurant.id).subscribe((promotions=>{
        this.promotions=promotions;
        this.dispatcherCurrentAndHoldPromotions(this.promotions)
      }));
    });
  }

  

  dispatcherCurrentAndHoldPromotions(promotions: Promotion[]){

    this.promotionsCurrent=[];
    this.promotionsHold=[];

    promotions.forEach((promo)=>{
      let endDatePromo=promo.endDate.toString().split('-')

      if(this.dateToDay.getUTCFullYear()>parseInt(endDatePromo[0])){
          this.promotionsHold.push(promo);
      }
      else{
        if((this.dateToDay.getUTCMonth()+1)>parseInt(endDatePromo[1]) && this.dateToDay.getUTCFullYear()==parseInt(endDatePromo[0])){
          this.promotionsHold.push(promo);
        }
        else{
          if(this.dateToDay.getDate()>parseInt(endDatePromo[2]) && (this.dateToDay.getUTCMonth()+1)==parseInt(endDatePromo[1])){
            this.promotionsHold.push(promo);
          }
          else{
            this.promotionsCurrent.push(promo);
          }
        }
      }
    });
  }

  deletePromotion(promotion: Promotion){
    this.promotionService.deletePromoByIdRestaurantAndIdPromo(promotion).subscribe((success)=>{
      this.getPromotionsByRestaurant();
    }, (error)=>{

    })
  }

  openDialogAjoutPromo(){
    const promoModalRef =this.dialog.open(AjoutPromoComponent, {
      data: this.restaurant,
      panelClass: 'panelAddPromo'
    });

    promoModalRef.afterClosed().subscribe((result)=>{
      if(result!=null){
        this.getPromotionsByRestaurant();
      }
    });
  }

  openDialogEditPromo(promo: Promotion){
    const promoModalRef =this.dialog.open(EditerPromoComponent, {
      data: promo,
      panelClass: 'panelAddPromo'
    });

    promoModalRef.afterClosed().subscribe((result)=>{
      if(result!=null){
        this.getPromotionsByRestaurant();
      }
    });
  }

}
