import { Component, OnInit } from '@angular/core';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Panier } from '../panier';
import { VariablesGlobales } from 'src/app/shared/globale';
import { Menu } from 'src/app/menu/menu';
import { OrderMenuItems, OrderProductItems } from '../order';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
  })

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier: Panier;
  url:string;
  name:string;
  routerLink:string;

  idRestaurant: any;
  showPanier = true;
  

  constructor(/*public dialogRef: MatDialogRef<PanierComponent>,*/ public global: VariablesGlobales, public dialog: MatDialog,
    public serviceRestaurant: RestaurantService,
    private activatedRoute: ActivatedRoute, private router: Router) { 
      
    }

  ngOnInit(): void {
    this.getPanier();
    this.url=localStorage.getItem("currentRoute")||"";
    this.routerLink=this.router.url.replace("/menus", "");
    this.name=localStorage.getItem("name")||'';
  }

  getPanier(){
    if(localStorage.getItem("panier")){
      this.panier= JSON.parse(localStorage.getItem("panier") || '{}');
    }
  }

clearLocalStorage(){

  localStorage.removeItem("panier");
  localStorage.removeItem("totalProduit");
  localStorage.removeItem("prixTotal");
  this.global.prixTotal=0;
  this.global.totalProduit=0;

}

exclureProduct(OrderItem:OrderProductItems){
  let localPanier=JSON.parse(localStorage.getItem("panier") || '{}');
  let index=this.panier.orderItem.indexOf(OrderItem);
  if(index!=-1){
    this.global.prixTotal-=(OrderItem.Product.price*this.panier.orderItem[index].Quantity);
    localStorage.setItem("prixTotal", this.global.totalProduit.toString());
    console.log(index)
    this.panier.orderItem.splice(index, 1);
    console.log(this.panier.orderItem)
    localPanier.orderItem=this.panier.orderItem;
    this.global.totalProduit-=1;
    this.updateobjectLocalStorage("produit", "sub", OrderItem.Product);
    if(this.global.totalProduit<=0){
      this.clearLocalStorage();
    }
    else{
      localStorage.setItem("totalProduit", this.global.totalProduit.toString());
      localStorage.setItem("panier", JSON.stringify(localPanier));
      localStorage.setItem("prixTotal", this.global.prixTotal.toString());
    }
   
  }
  
}

exclureMenu(OrderItem:OrderMenuItems){
  let localPanier=JSON.parse(localStorage.getItem("panier") || '{}');
  let index=this.panier.orderMenuItem.indexOf(OrderItem);

  if(index!=-1){
    this.global.prixTotal-=(OrderItem.Menu.price*this.panier.orderMenuItem[index].Quantity);
    this.panier.orderMenuItem.splice(index, 1);
    localPanier.orderMenuItem=this.panier.orderMenuItem;
    this.global.totalProduit-=1;
    this.updateobjectLocalStorage("menu", "sub", OrderItem.Menu);

    if(this.global.totalProduit<=0){
      this.clearLocalStorage();
    }
    else{
      localStorage.setItem("totalProduit", this.global.totalProduit.toString());
      localStorage.setItem("panier", JSON.stringify(localPanier));
      localStorage.setItem("prixTotal", this.global.prixTotal.toString());    
    }
    
  }

 }

augmenterQuantiteMenu(menu:Menu){

  for(let i=0; i<this.panier.orderMenuItem.length; i++){
    if(this.panier.orderMenuItem[i].Menu.id==menu.id && this.panier.orderMenuItem[i].Menu.products==menu.products){
      for(let j=0; j<this.global.data.items.length; j++){
        if (this.global.data.items[j].object.id==menu.id){
          this.global.data.items[j].nombre+=1;
          this.panier.orderMenuItem[i].Quantity+=1;
          this.global.totalProduit+=1;
          localStorage.setItem("totalProduit", this.global.totalProduit.toString());
          this.global.prixTotal+=this.panier.orderMenuItem[i].Menu.price;
          //On met a jour le localStorage
          this.addInLocalStorage(new OrderProductItems(), this.panier.orderMenuItem[i]);
          this.updateobjectLocalStorage("menu", "add", this.panier.orderMenuItem[i].Menu);
        }
      }
      
    }
  }
}

diminuerQuantiteMenu(OrderMenuItem:OrderMenuItems){

  let index=this.panier.orderMenuItem.indexOf(OrderMenuItem);
  if(index != -1){
    if( this.panier.orderMenuItem[index].Quantity>1){
      for(let j=0; j<this.global.data.items.length; j++){
        if (this.global.data.items[j].object.id==this.panier.orderMenuItem[index].Menu.id){
          this.global.data.items[j].nombre-=1;
          this.panier.orderMenuItem[index].Quantity-=1;
          this.global.totalProduit-=1;
          localStorage.setItem("totalProduit", this.global.totalProduit.toString());
          this.global.prixTotal-=this.panier.orderMenuItem[index].Menu.price;
          this.addInLocalStorage(new OrderProductItems(), this.panier.orderMenuItem[index]);
          this.updateobjectLocalStorage("menu", "sub", this.panier.orderMenuItem[index].Menu);
        }
      }
    }
    else{
      for(let j=0; j<this.global.data.items.length; j++){
        if (this.global.data.items[j].object.id==this.panier.orderMenuItem[index].Menu.id){
          this.global.data.items[j].nombre-=1;
          break;
        }
      }
      this.exclureMenu(OrderMenuItem);
    }
   }
}

augmenterQuantiteProduit(product:any){

  for(let i=0; i<this.panier.orderItem.length; i++){
    if(this.panier.orderItem[i].Product.id==product.id){
      for(let j=0; j<this.global.data.items.length; j++){
        if (this.global.data.items[j].object.id==product.id) {
          this.global.data.items[j].nombre+=1;
          break;
        }
      }
      this.panier.orderItem[i].Quantity+=1;
      this.global.totalProduit+=1;
      localStorage.setItem("totalProduit", this.global.totalProduit.toString());
      this.global.prixTotal+=this.panier.orderItem[i].Product.price;
      localStorage.setItem("prixTotal", this.global.prixTotal.toString());
      //On met a jour le localStorage
      this.addInLocalStorage(this.panier.orderItem[i], new OrderMenuItems());
      this.updateobjectLocalStorage("produit", "add", this.panier.orderItem[i].Product);
    }
  }
}

diminuerQuantiteProduit(orderItem:OrderProductItems){
  let trouv=false;
  for(let i=0; i<this.panier.orderItem.length; i++){
    if(this.panier.orderItem[i].Product.id==orderItem.Product.id && this.panier.orderItem[i].Quantity>1){
      for(let j=0; j<this.global.data.items.length; j++){
        if (this.global.data.items[j].object.id==orderItem.Product.id){
          this.global.data.items[j].nombre-=1;
          break;
        }
      }
      this.panier.orderItem[i].Quantity-=1;
      this.global.totalProduit-=1;
      localStorage.setItem("totalProduit", this.global.totalProduit.toString());
      this.global.prixTotal-=this.panier.orderItem[i].Product.price;
      trouv=true;
      //On met a jour le localStorage
      this.addInLocalStorage(this.panier.orderItem[i], new OrderMenuItems());
      this.updateobjectLocalStorage("produit", "sub", this.panier.orderItem[i].Product);
    }
  }
  if(trouv==false){
    for(let j=0; j<this.global.data.items.length; j++){
      if (this.global.data.items[j].object.id==orderItem.Product.id){
        this.global.data.items[j].nombre-=1;
        break;
      }
    }
    this.exclureProduct(orderItem);
  }
}

addInLocalStorage(orderProduct: OrderProductItems, orderMenu: OrderMenuItems){

  let localPanier=JSON.parse(localStorage.getItem("panier") || '{}');
  if(orderMenu.Menu!=null){
    let trouv=false;
    for(let i=0; i<localPanier.orderMenuItem.length; i++){
      if(localPanier.orderMenuItem[i].Menu.id==orderMenu.Menu.id){
        localPanier.orderMenuItem[i]=orderMenu;
        trouv=true;
      }
    }

  }

  if(orderProduct.Product!=null){
    let trouv=false;
    for(let i=0; i<localPanier.orderItem.length; i++){
      if(localPanier.orderItem[i].Product.id==orderProduct.Product.id){
        localPanier.orderItem[i]=orderProduct;
        trouv=true;
      }
    }

  }

  localStorage.setItem("panier", JSON.stringify(localPanier));
  localStorage.setItem("prixTotal", this.global.prixTotal.toString());
}

addOrder(){
  this.panier.montant=parseInt(localStorage.getItem("prixTotal")||'0');
  this.idRestaurant =localStorage.getItem("ID");
  this.routerLink=localStorage.getItem("currentRoute")||'';
  if(this.routerLink!==''){
    window.location.href=this.routerLink.replace("menus", "commande");
  }
}

updateobjectLocalStorage(typeData:string, operation:string, data:any){
  if(typeData==="menu"){
    let localMenus=JSON.parse(localStorage.getItem("menus")|| '{}');
    for(let i=0; i<localMenus.length; i++){
      if(localMenus[i].object.id==data.id){
        if(operation==="add"){
          localMenus[i].nombre+=1;
        }
        else{
          localMenus[i].nombre-=1;
        }
        break;
      }
    }
    localStorage.setItem("menus", JSON.stringify(localMenus));
  }
  else{
    let localProducts=JSON.parse(localStorage.getItem("products")|| '{}');
    for(let i=0; i<localProducts.length; i++){
      if(localProducts[i].object.id==data.id){
        if(operation==="add"){
          localProducts[i].nombre+=1;
        }
        else{
          localProducts[i].nombre-=1;
        }
        break;
      }
    }
    localStorage.setItem("products", JSON.stringify(localProducts));
  }
}
}
