import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../services/commande.service';
import { Supermarche } from '../../supermarche';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {
  type = "mobile";
  panelOpenState: boolean;
  cp: number=1;
  cp1: number=1;
  supermarket: any;
  commandes: any[]=[];
  commandesTraiter: any[]=[];
  supermarketSlugId: any;
  searchCmdAtraiter: any;
  searchCmdTraiter: any;

  constructor(public router: Router, private activatedRoute: ActivatedRoute, public commandeService: CommandeService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders()
  {
    this.supermarketSlugId = this.activatedRoute.snapshot.paramMap.get('slugId');
    this.commandeService.getSuperMarcheBySlugId(this.supermarketSlugId).subscribe(data =>{
      this.supermarket = data;
      this.commandeService.getCommandes(this.supermarket.id).subscribe(commandes => {
        this.commandes=[];
        this.commandesTraiter=[];
        this.dipatcherReservations(commandes);
      });
    })
  }

  dipatcherReservations(commandes: any[]){
    
    for (let index = 0; index < commandes.length; index++) {
      if(commandes[index].orderStatus!=0){
        this.commandesTraiter.push(commandes[index]);
      }
      else{
        this.commandes.push(commandes[index]);
      }
    }
  }

  details(commandeId: any)
  {
    this.router.navigate(['/manager/',this.supermarket.ownerId,this.supermarket.slugId,'commandes', 'details', commandeId]);
  }

  traiterCommande(commande: any)
  {

    if(commande.orderStatus!=1)
    {

      this.commandeService.traiterCommande(this.supermarket.id, commande.id).subscribe(() => {
        this.getOrders();
        this.panelOpenState = true;
      });

    }

  }

  annulerCommande(commande: any)
  {

    if(commande.orderStatus!=2)
    {

      this.commandeService.annulerCommande(this.supermarket.id, commande.id).subscribe(() =>{
        this.getOrders();
        this.panelOpenState = true;
      });

    }

  }

}
