import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../restaurant/restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import { Reservation } from 'src/app/reservation/reservation';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { CommandeService } from '../commande.service';


@Component({
  selector: 'app-liste-commandes',
  templateUrl: './liste-commandes.component.html',
  styleUrls: ['./liste-commandes.component.css']
})
export class ListeCommandesComponent implements OnInit {

  type = "mobile";
  panelOpenState: boolean;
  cp: number=1;
  cp1: number=1;
  restaurant: Restaurant;
  commandes: any[]=[];
  commandesTraiter: any[]=[];
  restaurantSlugId: any;
  searchCmdAtraiter: any;
  searchCmdTraiter: any;

  constructor(public router: Router, public serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute, public commandeService: CommandeService) { }

  ngOnInit(): void {
    this.getOrders();
    this.panelOpenState = false;
  }

  getOrders(){
    this.restaurantSlugId = this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceRestaurant.getRestaurantById(this.restaurantSlugId).subscribe(data => {
      this.restaurant = data;
      this.commandeService.getCommandes(this.restaurant.id).subscribe(commandes => {
        this.commandes=[];
        this.commandesTraiter=[]; 
        this.dipatcherReservations(commandes);
      });
    });
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

  details(commandeId: any){
      this.router.navigate(['/restaurateurs/',this.restaurant.ownerId,this.restaurant.slugId,'commandes', 'details', commandeId]);
  }

  traiterCommande(commande: any){
    if(commande.orderStatus!=1){
      this.commandeService.traiterCommande(this.restaurant.id, commande.id).subscribe(() =>{
        this.getOrders();
        this.panelOpenState = true;
      });
    }
  }

  annulerCommande(commande: any){
    if(commande.orderStatus!=2){
      this.commandeService.annulerCommande(this.restaurant.id, commande.id).subscribe(() =>{
        this.getOrders();
        //this.panelOpenState = true;
      });
    }
  }


}
