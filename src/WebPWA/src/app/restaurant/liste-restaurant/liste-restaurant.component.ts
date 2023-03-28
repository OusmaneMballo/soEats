import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';

import { RestaurantService} from '../restaurant.service';

@Component({
  selector: 'app-liste-restaurant',
  templateUrl: './liste-restaurant.component.html',
  styleUrls: ['./liste-restaurant.component.css']
})
export class ListeRestaurantComponent implements OnInit {

  content: Restaurant[] = [];
  counter: number = 6;
  listResto: Restaurant[] = [];
  
  constructor(private serviceResto:RestaurantService) {   
  }

  ngOnInit(): void {
    this.getContent();
  }  

  getContent(){
    this.serviceResto.getAllRestaurant().subscribe(data => {
      data.forEach((item)=>{
        if(this.testStatutConfig(item)){
          this.listResto.push(item);
        }
      });
    });
  }

  testStatutConfig(resto: Restaurant){
    let value=0;
    if(resto.description!=null && resto.description!=""){
      value+=20;
    }
        
    if(resto.imageUrl!=null && resto.imageUrl!=""){
      value+=20;
    }
        
    if(resto.photosUrls!=null && resto.photosUrls[0]!=null){
      value+=20;
    }
        
    for(let index = 0; index < resto.openingHours.length; index++) {
      if(resto.openingHours[index]!=null){
        value+=20;
          break;
      }
    }

    if(value>=80){
      return true;
    }
    return false;
  }

}

