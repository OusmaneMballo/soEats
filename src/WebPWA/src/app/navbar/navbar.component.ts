import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PanierComponent } from '../commande/panier/panier.component';
import { VariablesGlobales } from '../shared/globale';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  

  @Output() toggleSideBarforPanier: EventEmitter<any>= new EventEmitter();

  @Output() toggleSideBarforMe: EventEmitter<any>= new EventEmitter();


  nbrProduit: any={value:''};

  constructor(public dialog: MatDialog, public global: VariablesGlobales) { }

  ngOnInit(): void {}

  toggleSideBar ()
  {
  this.toggleSideBarforMe.emit();
  }

  toggleSideBarPanier()
  {
  this.toggleSideBarforPanier.emit();
  }	
  

  // showMenu(): void{
  //   this.dialog.open(PanierComponent, {
  //     panelClass: 'padding-dialog-panier'
  //   });
  // }
  
}
