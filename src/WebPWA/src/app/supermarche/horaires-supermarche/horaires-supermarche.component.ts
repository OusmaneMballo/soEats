import { Component, OnInit, Input } from '@angular/core';
import {RestaurantService} from 'src/app/restaurant/restaurant.service';
import { HoraireService} from 'src/app/shared/horaire.service';
import {ActivatedRoute} from '@angular/router';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';


@Component({
  selector: 'app-horaires-supermarche',
  templateUrl: './horaires-supermarche.component.html',
  styleUrls: ['./horaires-supermarche.component.css']
})

export class HorairesSupermarcheComponent implements OnInit {
  
  @Input() supermarche: Supermarche;
  private slugId: any
  tabNormalizeHoraire:any[]=[];

  constructor(private serviceSupermarche: SupermarcheService, private activatedRoute: ActivatedRoute, private horaireService: HoraireService) { }

  ngOnInit(): void {
    this.getSupermarche();
  }

  getSupermarche(){
    this.slugId=this.activatedRoute.snapshot.paramMap.get('slugId');
    this.serviceSupermarche.getSupermarketBySlugId(this.slugId).subscribe(data => {
      this.supermarche = data;
      this.tabNormalizeHoraire=this.horaireService.getNormalizeHoraires(this.supermarche.openingHours);
    });
  }
}
