import { Injectable } from '@angular/core';
import { Restaurant } from '../restaurant/restaurant';
import { Supermarche } from '../supermarche/supermarche';

@Injectable({
  providedIn: 'root'
})
export class ControlFormService {

  constructor() { }
/**
 * Expression régulière utilisée pour valider un numéro de téléphone.
 * **/
testNumeroTelephone(phoneNumber: string): boolean{
  let expReg=new RegExp("^(75|70|76|77|78)[0-9]{7}");
  if(expReg.test(phoneNumber)){
    return true;
  }
  return false;
}

/**
 * Expression régulière utilisée pour valider un numéro de téléphone.
 * **/
 testEmail(email: string): boolean{
  let expReg=new RegExp("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  if(expReg.test(email)){
    return true;
  }
  return false;
}

testChampAddRestauFormValid(restaurant: Restaurant){
  if(restaurant.email===null || restaurant.email===''){
    return false;
  }

  if(restaurant.name===null || restaurant.name===''){
    return false;
  }
  if(restaurant.phoneNumber===null || restaurant.phoneNumber===''){
    return false;
  }

  if(restaurant.address===null){
    return false;
  }
  return true;
}
testChampAddSuperMarcheFormValid(supermarche: Supermarche){
  if(supermarche.email===null || supermarche.email===''){
    return false;
  }

  if(supermarche.name===null || supermarche.name===''){
    return false;
  }
  if(supermarche.phoneNumber===null || supermarche.phoneNumber===''){
    return false;
  }

  if(supermarche.address===null){
    return false;
  }
  return true;
}
}
