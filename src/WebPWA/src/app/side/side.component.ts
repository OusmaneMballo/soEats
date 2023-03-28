import { Component, OnInit } from '@angular/core';
import { PanierComponent } from '../commande/panier/panier.component';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})

export class SideComponent implements OnInit {


sideBarOpen=false;
panierOpen=false;

  constructor() { }

  sideBarToggler(){ 
    this.sideBarOpen=! this.sideBarOpen;
  }

  sideBarPanier(){ 
    this.panierOpen=! this.panierOpen;
  }

  ngOnInit(): void {
  }

}
