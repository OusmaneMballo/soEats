import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../restaurant';
import {RestaurantService} from 'src/app/restaurant/restaurant.service';
import { HoraireService} from 'src/app/shared/horaire.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-horaires-restaurant',
  templateUrl: './horaires-restaurant.component.html',
  styleUrls: ['./horaires-restaurant.component.css']
})
export class HorairesRestaurantComponent implements OnInit {
  
  @Input() restaurant: Restaurant;
  private slugId: any
  tabNormalizeHoraire:any[]=[];

  constructor(private serviceRestaurant: RestaurantService, private activatedRoute: ActivatedRoute, private horaireService: HoraireService) { }

  ngOnInit(): void {
    this.getRestaurant();
  }

  getRestaurant(){
    this.slugId=this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceRestaurant.getRestaurantById(this.slugId).subscribe(data => {
      this.restaurant = data;
      this.tabNormalizeHoraire=this.horaireService.getNormalizeHoraires(this.restaurant.openingHours);
    });
  }
}
