import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormCreationRestoComponent } from '../form-creation-resto/form-creation-resto.component';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import { Carte } from '../carte';
import { ProduitService } from '../produit/produit.service';
import Swal from 'sweetalert2';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-creation-resto',
  templateUrl: './creation-resto.component.html',
  styleUrls: ['./creation-resto.component.css']
})
export class CreationRestoComponent implements OnInit {

  content: Restaurant[] = [];
  carte: Carte;
  counter: number = 6;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  ownerId: any;
  listResto: Restaurant[] = [];

  constructor(
              private router:ActivatedRoute,
              public dialog:MatDialog,
              private serviceResto:RestaurantService,
              private serviceProduit: ProduitService,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit(): void {
    this.ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId');
    this.getContent();
  }
  openDialog(){
    const dialogRef = this.dialog.open(FormCreationRestoComponent, {
      width: '470px',
      panelClass: 'myapp-no-padding-dialog',
      data: {
        ownerId:this.router.snapshot.params.ownerId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getContent();
    });
  }

  openDialogCategorie(){
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '470px',
      panelClass: 'myapp-no-padding-dialog',
    });
  }

  openDialogUpdateCategorie(){
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      // width: '470px',
      // height: '470px',
      panelClass: 'myapp-no-padding-dialog',
    });
  }

  getContent(){
    let currentOwnerId=this.router.snapshot.params.ownerId; //Récuperation du ownerId du restaurateur en cours de connexion
    this.serviceResto.getAllRestaurantByOwnerId(currentOwnerId).subscribe(data => {
      this.listResto = data;
         if(this.listResto.length>6){
          for(let i=0;i<6;i++)
          {
            this.getStatutResto(this.listResto[i]);
            this.content.push(this.listResto[i]);
          }
         }else{

          for(let i=0;i<this.listResto.length;i++){
            this.getStatutResto(this.listResto[i]);
          }

          this.content=this.listResto;
         }
    });
  }

  getCarte(id: string){
    this.serviceProduit.getCarteByIdRestaurant(id).subscribe((data)=>{
      this.carte=data;
    });
  }
  
  getRestaurants(){
    for(let i=this.counter;i<this.listResto.length;i++)
    {
      this.getStatutResto(this.listResto[i]);
      this.content.push(this.listResto[i]);
        if((i+1)%3==0){
          break;
        } 
    }
    this.counter+=3; 

  }

  hidenRestaurant(){
    this.content=[];
    this.counter=6;
    for(let i=0;i<6;i++)
    {
      this.content.push(this.listResto[i]);
    }
  }

  async getStatutResto(resto: Restaurant){

    if(resto.description!=null && resto.description!=""){
      this.value+=25;
    }

    if(resto.imageUrl!=null && resto.imageUrl!=""){
      this.value+=25;
    }

    if(resto.photosUrls!=null && resto.photosUrls[0]!=null){
      this.value+=25;
    }

    for (let index = 0; index < resto.openingHours.length; index++) {
      if(resto.openingHours[index]!=null){
        this.value+=25;
        break;
      }
      
    }
    resto.pourcentage=this.value;
    this.value=0;
  }


  testCategorie(carte: Carte){
     
    for(let i=0; i<5; i++){
      let trouv=false;
      for(let j=0; j< carte.products.length; j++){
        if (carte.products[j].categorie==i) {
          trouv=true;
          break;
        }
      }

      if(trouv==false){
        return false;
      }
    }

    return true;
  }

  supprimerRestaurant(id: string){
    Swal.fire({
      title: 'Voulez vous supprimer le restaurant ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Annuler',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceResto.deleteRestaurantById(id).subscribe((response)=>{
          this.getContent();
          Swal.fire(
            'Succès!',
            'le restaurant a été supprimer.',
            'success'
          )
      },
      (error)=>{
        Swal.fire(
          'Supprimer!',
          "le restaurant n'a pas été supprimer.",
          'error'
        )
      })
      }
    })
 
  }

}
