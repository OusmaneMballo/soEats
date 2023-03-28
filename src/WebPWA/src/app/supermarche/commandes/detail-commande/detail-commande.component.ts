import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from '../../services/commande.service';
import { Supermarche } from '../../supermarche';
import { SupermarcheService } from '../../services/supermarche.service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit {

  superMarket: Supermarche;
  idSuperMarket: any;
  idCommande: any;
  commande: any;
  sectionId: any;
  total=0;

  constructor(public serviceSuperMarket: SupermarcheService, private activatedRoute: ActivatedRoute, public commandeService: CommandeService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSuperMarketBySlugId();
  }

  getSuperMarketBySlugId(){
    
    this.total = 0;
    this.idSuperMarket = this.activatedRoute.snapshot.paramMap.get('slugId');
    if(this.idSuperMarket!=null){
      this.serviceSuperMarket.getSupermarcheById(this.idSuperMarket).subscribe(data => {
        this.superMarket = data;
        this.idCommande = this.activatedRoute.snapshot.paramMap.get('commandeId');
        this.commandeService.getCommandeById(this.superMarket.id, this.idCommande).subscribe(commande => {
          this.commande = commande;
          for(let orderProduct of this.commande.orderProductItems){
               this.total+=orderProduct.product.price * orderProduct.quantity;
          }
        });
      });
    }
    else{
      let urlClient= this.activatedRoute.snapshot.paramMap.get('commandeId');
      let slugIdSuperMarket = this.activatedRoute.snapshot.paramMap.get('slugId');
      if(urlClient!=null && slugIdSuperMarket!=null){
        this.serviceSuperMarket.getSupermarcheById(this.idSuperMarket).subscribe(data => {
          this.superMarket = data;
          this.idCommande = urlClient;
          this.commandeService.getCommandeById(this.superMarket.id, this.idCommande).subscribe(commande => {
            this.commande = commande;
            for(let orderProduct of this.commande.orderProductItems){
              this.total+=orderProduct.product.price * orderProduct.quantity;
            }
          });
        });
      }
    }
    
  }

}
