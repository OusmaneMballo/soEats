import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { HoraireService} from 'src/app/shared/horaire.service';
import { Restaurant } from 'src/app/restaurant/restaurant';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReservationClientComponent } from '../../reservation/reservation-client/reservation-client.component';
import { AffichageImageComponent } from 'src/app/restaurant/menu-restaurant/affichage-image/affichage-image.component';
import { ProduitService } from '../produit/produit.service';
import { Produit } from '../produit/produit';
import { EditReservationComponent } from 'src/app/reservation/edit-reservation/edit-reservation.component';
import { ReservationService } from 'src/app/reservation/reservation.service';
import Swal from 'sweetalert2';
import { VariablesGlobales } from 'src/app/shared/globale';
import { Horaire } from 'src/app/shared/horaire';

@Component({
  selector: 'app-detail-restaurant',
  templateUrl: './detail-restaurant.component.html',
  styleUrls: ['./detail-restaurant.component.css']
})
export class DetailRestaurantComponent implements OnInit {
  restaurant: Restaurant;
  openingHours: any [] ;
  idRestaurant: any;
  slugId : any;
  tabNormalizeHoraire:any[]=[];
  produits: Produit[]=[];
   
  today : number = new Date().getUTCDay();
  hours : number = new Date().getUTCHours();
  minutes : number = new Date().getUTCMinutes();  

  commander = false;

  /**
   * Injection des services et de la ActivedRoute
   * **/
  constructor(
    public serviceRestaurant: RestaurantService,
    private horaireService: HoraireService,
    private produitService: ProduitService,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public global: VariablesGlobales,
    private router : Router,
    ) { 
        this.restaurant=new Restaurant();
    }

  ngOnInit(): void {
    this.getRestaurant();
    this.verificationSiRestaurantOuvert();
    this.openEditDialog();
  }

  /**
   * Fonction de recuperation d'un restaurant à partir de son slugId
   * **/
  getRestaurant(){
    //Recuperation du slugid via l'URL
    this.idRestaurant = this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceRestaurant.getRestaurantById(this.idRestaurant).subscribe(data => {
      this.restaurant = data;
      this.getCartByIdRestaurant(this.restaurant.id);
      this.tabNormalizeHoraire=this.horaireService.getNormalizeHoraires(this.restaurant.openingHours);
    });
  }

  verificationSiRestaurantOuvert(){
    //Recuperation du slugid via l'URL
    this.slugId = this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceRestaurant.getRestaurantBySlugId(this.slugId).subscribe(data => {
      this.restaurant = data;
      this.getCartByIdRestaurant(this.restaurant.id);      
      this.tabNormalizeHoraire=this.horaireService.getNormalizeHoraires(this.restaurant.openingHours);
      for(let i=0; i<this.tabNormalizeHoraire.length; i++){
        if (this.tabNormalizeHoraire[i].horaire!=null) {
          if (this.today == this.tabNormalizeHoraire[i].horaire.dayOfWeek ) {
            let start: number=parseInt(this.tabNormalizeHoraire[i].horaire.slot1.startTime.toString())
            let end: number =parseInt(this.tabNormalizeHoraire[i].horaire.slot1.endTime.toString())
            if (this.hours>=start && this.hours<end) {
              this.commander = true;
              break ;

            }else{
              if (this.tabNormalizeHoraire[i].horaire.slot2!= null) {
                let start2 : number =parseInt(this.tabNormalizeHoraire[i].horaire.slot2.startTime.toString())
                let end2 : number =parseInt(this.tabNormalizeHoraire[i].horaire.slot2.endTime.toString())
                
                if (start2 > end2) {
                  end2 = 24 + end2;
                }

                if(this.hours>=start2 && this.hours<end2){
                  this.commander = true;
                  break ;
                }
              }
              this.commander = false
            }
          }
        }
      }
    });
  }

  openDialogImage(img: any): void {
    this.dialog.open(AffichageImageComponent, {
      data: img,
      panelClass: 'padding-dialog'
    });
  }

  restaurantFermer(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Le Restaurant est fermé !',
    })
  }

  openDialog(): void {
    this.dialog.open(ReservationClientComponent, {
      data: this.restaurant,
      panelClass: 'padding-dialog-reserver'
    });

  }

  getCartByIdRestaurant(idRestaurant:any){

    this.produitService.getCarteByIdRestaurant(idRestaurant).subscribe(
      (data)=>{
        this.produits = data.products.slice(0, 3);
      },
      (error)=>{
      }
    );

  }

  openEditDialog(){
    let url = this.activatedRoute.snapshot.paramMap.get('reservationId');
    if (url != null) {
      this.reservationService.getReservation(url).subscribe((data)=>{
        this.dialog.open(EditReservationComponent, {
          data: data,
          panelClass: 'padding-dialog-reserver'
        });
      },
      (error)=>{

      })
    }

  }

  verificationContenuPanier(restaurant: any){

    if(localStorage.getItem("ID")!=restaurant.id && localStorage.getItem("panier")){
      Swal.fire({
        title: 'Attention !',
        text: "Vous avez des produits dans votre panier. Si vous changez de restaurant votre panier sera vidé.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuer'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("ID", restaurant.id);
          localStorage.setItem("name",restaurant.name);
          localStorage.removeItem("panier")
          localStorage.removeItem("totalProduit")
          localStorage.removeItem("prixTotal")
          localStorage.removeItem("menus")
          localStorage.removeItem("products")
          this.global.prixTotal=0;
          this.global.totalProduit=0;
          window.location.reload();
          localStorage.removeItem("currentRoute");
          window.location.href=this.router.url+"/menus";
        }
      })
    }
    else{
      window.location.href=this.router.url+"/menus"
    }
  }
}
