import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Horaire} from './horaire';
import { Slot} from './slot';
import {environment} from 'src/environments/environment';
import {Restaurant} from 'src/app/restaurant/restaurant'
import { HttpClient} from '@angular/common/http';
import {RestaurantService} from 'src/app/restaurant/restaurant.service';
import { Supermarche } from '../supermarche/supermarche';

export const API_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root'
})

export class HoraireService {
  serviceRestaur: RestaurantService;
  constructor(private httpClient: HttpClient) { }

/** Add Hours into the API */
addHoraire(horaire: Horaire, uuid_restaurant: String): Observable<Horaire> {
  
  let url = `${API_URL+'restaurants'}/${uuid_restaurant}`+'/openinghours';
  return this.httpClient.put<Horaire>(url, horaire);
}

/** Add supermarket Hours into the API */
addHoraireSupermarche(horaire: Horaire, uuid_supermarche: String): Observable<Horaire> {
  
  let url = `${API_URL+'supermarkets'}/${uuid_supermarche}`+'/openinghours';
  return this.httpClient.put<Horaire>(url, horaire);
}

/**
 * La fonction verifit si le creneau saisi respect
 * l'expression regulier. 00:00 à 23:59
 * Au delà de cette interval d'horaire la fonction retourne false
 * **/
testCaractereHoraire(creneau: string): boolean{
  let expReg=new RegExp("(2[0-3]|[0][0-9]|1[0-9]):([0-5][0-9])");

  //On test le cas null par ce que le créneau 2 peut etre null. Alors si c'est le cas on retourne true.
  if(expReg.test(creneau) || creneau===null || creneau===''){
    return true;
  }
  return false;
}

 /**
   * Fonction de recuperation des horaires d'ouverture
   * d'un restaurant a partir de son slugid
   * **/
  getOpenHoursBySlugId(id: string){
    let openHours: Horaire[]=[];
    return this.httpClient.get<Restaurant>(API_URL + `restaurants/${id}`)
  }

 /**
   * Fonction de recuperation des horaires d'ouverture
   * d'un supermarché a partir de son slugid
   * **/
  getSupermarketOpenHoursBySlugId(id: string){
    let openHours: Horaire[]=[];
    return this.httpClient.get<Supermarche>(API_URL + `supermarkets/${id}`)
  }

  /**
   * La fonction prend en parametre un tableau d'horaire et
   * prend les horaires les mettre dans un tableau trié en fonction
   * des jours de la semaine puis retourne
   * le tableau trié contenant les horaires.
   * **/
  getNormalizeHoraires(tabHoraire: Horaire[]) {
    //Initialisation du tableau trié
    let horaires:any[]=[{'dayOfWeek':'Dimanche','horaire': null},{'dayOfWeek':'Lundi','horaire': null},{'dayOfWeek':'Mardi','horaire': null},{'dayOfWeek':'Mercredi','horaire': null},{'dayOfWeek':'Jeudi','horaire': null},{'dayOfWeek':'Vendredi','horaire': null},{'dayOfWeek':'Samedi','horaire': null}]
    let i=0;
    for (const horaire of tabHoraire) {
        if(horaire.dayOfWeek==0){
          horaires[0]={'dayOfWeek': "Dimanche", 'horaire': horaire};
        }
        else{
          if(horaire.dayOfWeek==1){
            horaires[1]={'dayOfWeek': "Lundi", 'horaire': horaire};
          }
          else{
            if(horaire.dayOfWeek==2){
              horaires[2]={'dayOfWeek': "Mardi", 'horaire': horaire};
            }
            else{
              if(horaire.dayOfWeek==3){
                horaires[3]={'dayOfWeek': "Mercredi", 'horaire': horaire};
              }
              else{
                if(horaire.dayOfWeek==4){
                  horaires[4]={'dayOfWeek': "Jeudi", 'horaire': horaire};
                }
                else{
                  if(horaire.dayOfWeek==5){
                    horaires[5]={'dayOfWeek': "Vendredi", 'horaire': horaire};
                  }
                  else{
                    if(horaire.dayOfWeek==6){
                      horaires[6]={'dayOfWeek': "Samedi", 'horaire': horaire};
                    }
                  }
                }
              }
            }
          }
        }
    }
    return horaires;
  }

}
