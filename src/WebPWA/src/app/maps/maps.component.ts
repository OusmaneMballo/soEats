import { Component, AfterViewInit } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
//On remplace OnInit par AfterInit. Ce qui permetra le chargement de la carte aprés le chargement de tous les composants de la page
export class MapsComponent implements AfterViewInit {
  map: any;
  constructor() { }

  ngAfterViewInit(): void {
    this.creationCarteMap();
  }

  /**
   * Fonction de création de carte maps
   * **/
  creationCarteMap(){
      const coordonnee={
        lat: 14.748594,
        lng: -17.4555802
      };
      this.map=Leaflet.map('map').setView([coordonnee.lat, coordonnee.lng], 13);
      
      Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'sk.eyJ1Ijoib3VzbWFuZW1iYWxsbyIsImEiOiJja29hMzY5c3oweGI0MnZzMmJyemM4anplIn0.6iAzlETTIdCNFw5N9desvA'
      }).addTo(this.map);

      //Ajout du marqueur
      let marker = Leaflet.marker([coordonnee.lat, coordonnee.lng]).addTo(this.map);
      var circle = Leaflet.circle([coordonnee.lat, coordonnee.lng], {
        color: '#171be95e',
        fillColor: '#171be95e',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(this.map);
      marker.bindPopup("<b>Lamiral</b><br>A la Sénégalaise!").openPopup();
  }
}
