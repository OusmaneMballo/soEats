import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../services/commande.service';
import { PromotionSupermarcheService } from '../../services/promotion-supermarche.service';
import { SupermarcheService } from '../../services/supermarche.service';
import { Supermarche } from '../../supermarche';
import { AjoutPromotionSupermarcheComponent } from '../ajout-promotion-supermarche/ajout-promotion-supermarche.component';
import { EditPromotionSupermarcheComponent } from '../edit-promotion-supermarche/edit-promotion-supermarche.component';
// import { AjoutPromoComponent } from '../ajout-promo/ajout-promo.component';
// import { EditerPromoComponent } from '../editer-promo/editer-promo.component';
import { Promotion } from '../promotion';
// import { PromotionService } from '../promotion.service';
@Component({
  selector: 'app-list-promotion-supermarche',
  templateUrl: './list-promotion-supermarche.component.html',
  styleUrls: ['./list-promotion-supermarche.component.css']
})

export class ListPromotionSupermarcheComponent implements OnInit {

  type = "mobile";
  panelOpenState: boolean;
  cp: number=1;
  cp1: number=1;
  supermarche: Supermarche;
  promotions: Promotion[]=[];
  promotionsHold: Promotion[]=[];
  promotionsCurrent: Promotion[]=[];
  supermarcheSlugId: any;
  searchCmdAtraiter: any;
  searchCmdTraiter: any;
  dateToDay: Date;

  constructor(
    public router: Router,
    public serviceSupermarche: SupermarcheService,
    private activatedRoute: ActivatedRoute,
    public commandeService: CommandeService,
    public promotionSupermarcheService: PromotionSupermarcheService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPromotionsBySupermarche();
    this.panelOpenState = false;
    this.dateToDay=new Date();
  }


  getPromotionsBySupermarche(){
    this.supermarcheSlugId = this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceSupermarche.getSupermarketBySlugId(this.supermarcheSlugId).subscribe(data => {
      this.supermarche = data;
      this.promotionSupermarcheService.getPromotionsSupermarche(this.supermarche.id).subscribe((promotions=>{
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
    this.promotionSupermarcheService.deletePromoByIdSupermarcheAndIdPromo(promotion).subscribe((success)=>{
      this.getPromotionsBySupermarche();
    }, (error)=>{

    })
  }

  openDialogAjoutPromo(){
    const promoModalRef =this.dialog.open(AjoutPromotionSupermarcheComponent, {
      data: this.supermarche,
      panelClass: 'panelAddPromo'
    });

    promoModalRef.afterClosed().subscribe((result)=>{
      if(result!=null){
        this.getPromotionsBySupermarche();
      }
    });
  }

  openDialogEditPromo(promo: Promotion){
    const promoModalRef =this.dialog.open(EditPromotionSupermarcheComponent, {
      data: promo,
      panelClass: 'panelAddPromo'
    });

    promoModalRef.afterClosed().subscribe((result)=>{
      if(result!=null){
        this.getPromotionsBySupermarche();
      }
    });
  }

}
