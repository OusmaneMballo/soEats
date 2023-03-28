import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AjoutLogoRestaurantComponent } from '../../restaurant/logo-restaurant/ajout-logo-restaurant/ajout-logo-restaurant.component';
import { Restaurant, RestaurantCategorie } from '../../restaurant/restaurant';
import { RestaurantService } from '../../restaurant/restaurant.service';
import { ControlFormService } from 'src/app/shared/control-form.service';
import { Horaire } from 'src/app/shared/horaire';
import { Slot } from 'src/app/shared/slot';
import { HoraireService } from 'src/app/shared/horaire.service';
import { FormControl } from '@angular/forms';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';

@Component({
  selector: 'app-form-creation-super-marche',
  templateUrl: './form-creation-super-marche.component.html',
  styleUrls: ['./form-creation-super-marche.component.css']
})
export class FormCreationSuperMarcheComponent implements OnInit {

  payerCash: boolean;
  logo: File;
  imgURL: any;
  idSuperMarche: any;
  errorInput: string='';
  supermarche: Supermarche;
  disable = false;

  @ViewChild('FormCreateSupermarche') form: any;
  constructor(
    public dialogRef: MatDialogRef<AjoutLogoRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serviceSupermarche: SupermarcheService,
    private controlFormService: ControlFormService,
    private activateRoute: ActivatedRoute,
    private horaireService: HoraireService) {
      
    }

  ngOnInit(): void {
    this.supermarche=new Supermarche();
    this.supermarche.name='';
    this.supermarche.email='';
    this.supermarche.phoneNumber='';
    this.supermarche.address='';
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
      this.serviceSupermarche.addLogoSupermarche(this.data.id, this.logo).subscribe(res => {
        window.location.reload();
       });
     }
  }

  /**
   * Creation d'un nouveau supermarché
   * **/
  createSupermarche(){
    this.disable = true;

      let ownerId= this.data.ownerId;
      this.supermarche.ownerId=ownerId!=null?ownerId:'00000000-0000-0000-0000-000000000000';
      this.supermarche.description='';
      if( this.controlFormService.testChampAddSuperMarcheFormValid(this.supermarche)){
        if(this.controlFormService.testNumeroTelephone(this.supermarche.phoneNumber)){
          if(this.controlFormService.testEmail(this.supermarche.email)){
            console.log("okey okey")
            this.serviceSupermarche.addSupermarche(this.supermarche).subscribe(
              (response)=>{
                console.log(response)
                this.dialogRef.close();
                this.supermarche.openingHours=this.initializHour(response);
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
   * La fonction recoit en parametre le uuid du restaurant et initialise les horaires. 
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
      this.horaireService.addHoraireSupermarche(openingHours[index], uuid_restaurant).subscribe(()=>{});
    }
    
    return openingHours;
  }

}
