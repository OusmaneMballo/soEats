import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AjoutLogoRestaurantComponent } from '../logo-restaurant/ajout-logo-restaurant/ajout-logo-restaurant.component';
import { Restaurant, RestaurantCategorie } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ControlFormService } from 'src/app/shared/control-form.service';
import { Horaire } from 'src/app/shared/horaire';
import { Slot } from 'src/app/shared/slot';
import { HoraireService } from 'src/app/shared/horaire.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-creation-resto',
  templateUrl: './form-creation-resto.component.html',
  styleUrls: ['./form-creation-resto.component.css']
})
export class FormCreationRestoComponent implements OnInit {

  payerCash: boolean;
  logo: File;
  imgURL: any;
  idRestaurant: any;
  errorInput: string='';
  restaurant: Restaurant;
  disable = false;

  @ViewChild('FormCreateResto') form: any;

  restaurantCategorie: RestaurantCategorie[]=[];
  categoriesSelected = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<AjoutLogoRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serviceRestaurant: RestaurantService,
    private controlFormService: ControlFormService,
    private activateRoute: ActivatedRoute,
    private horaireService: HoraireService) {
      
    }

  ngOnInit(): void {
    this.restaurant=new Restaurant();
    this.restaurant.name='';
    this.restaurant.email='';
    this.restaurant.phoneNumber='';
    this.restaurant.address='';
    this.restaurant.restaurantCategories=[];
    this.payerCash = true;

    this.getRestaurantCategorie();
  }

  getRestaurantCategorie(){
    this.serviceRestaurant.getAllRestaurantCategorie().subscribe((data)=>{
      this.restaurantCategorie=data;
    })
  }
  
  preview(files: any) {
    if (files.length === 0)
      return;
      
      this.logo = files[0];
 
    var reader = new FileReader();
    reader.readAsDataURL(this.logo); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  addLogo(): void{
     if(this.logo){
      this.serviceRestaurant.addLogoRestaurant(this.data.id, this.logo).subscribe(res => {
        window.location.reload();
       });
     }
  }

  /**
   * Creation d'un nouveau restaurant
   * **/
  createRestaurant(){
    this.disable = true;

      let ownerId= this.data.ownerId;
      this.restaurant.ownerId=ownerId!=null?ownerId:'00000000-0000-0000-0000-000000000000';
      this.restaurant.description='';
      if( this.controlFormService.testChampAddRestauFormValid(this.restaurant) && this.categoriesSelected.value!=null){
        if(this.controlFormService.testNumeroTelephone(this.restaurant.phoneNumber)){
          if(this.controlFormService.testEmail(this.restaurant.email)){
            this.restaurant.restaurantCategories=this.categoriesSelected.value;
            this.serviceRestaurant.addRestaurant(this.restaurant).subscribe(
              (response)=>{
                this.form.reset();
                this.dialogRef.close();
                this.restaurant.openingHours=this.initializHour(ownerId);
              },
              (error)=>{
                this.disable = false;
              }
            );
          }
          else{
            this.errorInput='errorEmail';
            this.disable = false;
          }
        }
        else{
          this.errorInput='errorTel';
          this.disable = false;
        }
      }else{
        this.disable = false;
      }
    
  }
  /**
   * Fonction d'initialisation des horaires d'un restaurant.
   * La fonction recoit en parametre le uuid du restaurant et ajout initialise les horaires. 
   * **/
  initializHour(uuid_restaurant:any){

    let slot1=new Slot();
    slot1.endTime=null;
    slot1.startTime=null;

    let slot2=new Slot();
    slot2.endTime=null;
    slot2.startTime=null;

    let openingHours:Horaire[]=[
      {dayOfWeek: 0, slot1:slot1, slot2:slot2},
      {dayOfWeek: 1, slot1:slot1, slot2:slot2},
      {dayOfWeek: 2, slot1:slot1, slot2:slot2},
      {dayOfWeek: 3, slot1:slot1, slot2:slot2},
      {dayOfWeek: 4, slot1:slot1, slot2:slot2},
      {dayOfWeek: 5, slot1:slot1, slot2:slot2},
      {dayOfWeek: 6, slot1:slot1, slot2:slot2}
    ]
    for (let index = 0; index < openingHours.length; index++) {
      //Appel de l'API
      this.horaireService.addHoraire(openingHours[index], uuid_restaurant).subscribe(()=>{});
    }
    
    return openingHours;
  }

}
