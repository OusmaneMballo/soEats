import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { Produit } from 'src/app/restaurant/produit/produit';
import { ProduitService } from 'src/app/restaurant/produit/produit.service';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { Menu } from '../menu';
import { ChoixMenuComponent } from './choix-menu/choix-menu.component';
import { Panier } from 'src/app/commande/panier';
import { OrderProductItems, OrderMenuItems, Order } from 'src/app/commande/order';
import { AjoutCommandeComponent } from 'src/app/commande/ajout-commande/ajout-commande.component';
import { VariablesGlobales } from 'src/app/shared/globale';
import { Carte } from 'src/app/restaurant/carte';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.css']
})
export class ClientMenuComponent implements OnInit {
  restaurant: Restaurant;
  categorie:any[];
  itemCategorie: {id: number, title: string, style: object};
  idRestaurant: any;
  item:{object:any, nombre:number};
  produits: Produit[]=[];
  menus: Menu[]=[];
  menusPanier: Menu[]=[];
  panier=new Panier();

  panelOpenState = false;
  showPanier = true;
  
  Checked=false;

  nbrItems=0;
  constructor( 
    public serviceRestaurant: RestaurantService,
    private produitService: ProduitService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, 
    public global: VariablesGlobales,
    private router : Router
  ) { }

  ngOnInit(): void {
    if(!localStorage.getItem('panier')){
     localStorage.clear();
    }
    this.getRestaurant();
    this.panier.orderMenuItem=[];
    this.panier.orderItem=[];
  }

  initializeCategorie(carte: Carte){
    this.categorie=[];
    let isFirst=false;
    if(carte.menus[0]!=null){
      let item={id : 5 ,  title : 'Menu', style: {'color':'#FFFFFF', 'background-color':'#3346FF'}}
      this.categorie.push(item);
      isFirst=true;
    }

    carte.products.forEach(element => {
      if (element.categorie==0) {

        let trouve=false;
        this.categorie.forEach((it)=>{
          if (it.title=="Entrée") {
            trouve=true;
          }
        });
        if (trouve==false) {

          if(isFirst==false){
            let item={id : 0 ,  title : 'Entrée', style: {'color':'#FFFFFF', 'background-color':'#3346FF'}}
            this.categorie.push(item);
            carte.products.forEach((e)=>{

              if(e.categorie==0){
                let item={object:e, nombre:0};
                this.global.data.items.push(item);
                this.produits= carte.products;
              }
            });
            isFirst=true
          }
          else{
            let item={id : 0 ,  title : 'Entrée', style: {'color':'#3346FF', 'background-color':'#FFFFFF'}}
            this.categorie.push(item);
          }
        }
      }
      else{
        if(element.categorie==1){

          let trouve=false;
          this.categorie.forEach((it)=>{
            if (it.title=="Boisson") {
              trouve=true;
            }
          });
          if (trouve==false) {
            
            if(isFirst==false){
              let item={id : 0 ,  title : 'Boisson', style: {'color':'#FFFFFF', 'background-color':'#3346FF'}}
              this.categorie.push(item);
              carte.products.forEach((e)=>{
                if(e.categorie==1){
                  let item={object:e, nombre:0};
                  this.global.data.items.push(item);
                  this.produits= carte.products;
                }
              });
              isFirst=true
            }
            else{
              let item={id : 0 ,  title : 'Boisson', style: {'color':'#3346FF', 'background-color':'#FFFFFF'}}
              this.categorie.push(item);
            }
          }

        }
        else{
          if(element.categorie==2){

            let trouve=false;
            this.categorie.forEach((it)=>{
              if (it.title=="Plat") {
                trouve=true;
              }
            });
            if (trouve==false) {
              if(isFirst==false){
                let item={id : 0 ,  title : 'Plat', style: {'color':'#FFFFFF', 'background-color':'#3346FF'}}
                this.categorie.push(item);

                carte.products.forEach((e)=>{

                  if(e.categorie==2){
                    let item={object:e, nombre:0};
                    this.global.data.items.push(item);
                    this.produits= carte.products;
                  }
                });
                isFirst=true
              }
              else{
                let item={id : 0 ,  title : 'Plat', style: {'color':'#3346FF', 'background-color':'#FFFFFF'}}
                this.categorie.push(item);
              }

            }

          }
          else{
            if(element.categorie==3){

              let trouve=false;
              this.categorie.forEach((it)=>{
                if (it.title=="Dessert") {
                  trouve=true;
                }
              });
              if (trouve==false) {

                if(isFirst==false){
                  let item={id : 0 ,  title : 'Dessert', style: {'color':'#FFFFFF', 'background-color':'#3346FF'}}
                  this.categorie.push(item);
                  carte.products.forEach((e)=>{
                    if(e.categorie==3){
                      let item={object:e, nombre:0};
                      this.global.data.items.push(item);
                      this.produits= carte.products;
                    }
                  });
                  isFirst=true
                }
                else{
                  let item={id : 0 ,  title : 'Dessert', style: {'color':'#3346FF', 'background-color':'#FFFFFF'}}
                  this.categorie.push(item);
                }
              }
            }
            else{
              if(element.categorie==4){

                let trouve=false;
                this.categorie.forEach((it)=>{
                  if (it.title=="Patisserie") {
                    trouve=true;
                  }
                });
                if (trouve==false) {

                  if(isFirst==false){
                    let item={id : 0 ,  title : 'Patisserie', style: {'color':'#FFFFFF', 'background-color':'#3346FF'}}
                    this.categorie.push(item);
                    carte.products.forEach((e)=>{
                      if(e.categorie==4){
                        let item={object:e, nombre:0};
                        this.global.data.items.push(item);
                        this.produits= carte.products;
                      }
                    });
                    isFirst=true
                  }
                  else{
                    let item={id : 0 ,  title : 'Patisserie', style: {'color':'#3346FF', 'background-color':'#FFFFFF'}}
                    this.categorie.push(item);
                  }

                }
              }
            }
          }
        }
      }
    });
  }

  public getRestaurant(){
    this.restaurant=new Restaurant();
    this.idRestaurant = this.activatedRoute.snapshot.paramMap.get('slugId');
      this.serviceRestaurant.getRestaurantById(this.idRestaurant).subscribe(data => {
        this.restaurant = data;
        this.produitService.getCarteByIdRestaurant(this.restaurant.id).subscribe(
          (data)=>{
            this.initializeCategorie(data);
            if(!localStorage.getItem("menus") || localStorage.getItem("menus")==null){
              localStorage.setItem("currentRoute",this.router.url)

              data.menus.forEach((e)=>{
                let item={object:e, nombre:0};
                this.global.data.items.push(item);
              });
              localStorage.setItem("menus", JSON.stringify(this.global.data.items));
              this.menus=data.menus;
            }
            else{
              if (localStorage.getItem("ID")==this.restaurant.id) {
                this.global.data.items=JSON.parse(localStorage.getItem("menus")|| '{}');
              }
              else{
                if(!localStorage.getItem("panier")){
                  localStorage.removeItem("products");
                  this.global.data.items=[];
                  data.menus.forEach((e)=>{
                    let item={object:e, nombre:0};
                    this.global.data.items.push(item);
                  });
                  localStorage.setItem("ID", data.id);
                  localStorage.setItem("name",data.name);
                  localStorage.setItem("currentRoute",this.router.url)
                  localStorage.setItem("menus", JSON.stringify(this.global.data.items));
                  this.menus=data.menus;
                }
              }
            }
              
            this.produitService.getProduitsByIdCarte(data.id).subscribe(
              (data)=>{
                this.produits=data;
              }
            )
          }
        );
        if(!localStorage.getItem("ID")){
          localStorage.setItem("ID", data.id);
          localStorage.setItem("name",data.name);
          localStorage.setItem("currentRoute",this.router.url)
        }
      });
  }

  public catClick(title:any): void{
    this.global.data.items=[];
    if(title==="Menu" && this.global.data!=null){
      let localMenus=JSON.parse(localStorage.getItem("menus")|| '{}')
      this.global.data.items=localMenus;
      this.changementStyle("Menu");
    }
    else{
      
      if(title==="Boisson"){
        this.changementStyle("Boisson");
        this.funcTrie(1);
      }
      else{
        if(title==="Entrée"){
          this.changementStyle("Entrée");
          this.funcTrie(0);
        }
        else{
          if(title==="Patisserie"){
            this.changementStyle("Patisserie");
            this.funcTrie(4);
          }
          else{
            if(title==="Dessert"){
              this.changementStyle("Dessert");
              this.funcTrie(3);
            }
            else{
              if(title==="Plat"){
                this.changementStyle("Plat");
                this.funcTrie(2);
              }
            }
          }
        }
      }
    }
  }

  funcTrie(typeCat:number){

    if(!localStorage.getItem("products")){
      let produitLocal:any[]=[]
      this.produits.forEach(element=>{
        if(element.categorie==typeCat){
          let item={object:element, nombre:0};
          this.global.data.items.push(item);
        }
      produitLocal.push({object:element, nombre:0});
      });
      localStorage.setItem("products", JSON.stringify(produitLocal));
    }
    else{
      
      let produitLocal=JSON.parse(localStorage.getItem("products")|| '{}')
     
      for(let i=0; i<produitLocal.length; i++){

        if(produitLocal[i].object.categorie == typeCat){
          
          this.global.data.items.push(produitLocal[i]);
        }

      }
    }
  }
 

  changementStyle(title:string){

    this.categorie.forEach((elem)=>{
      if (elem.title==title) {
        elem.style={'color':'#FFFFFF', 'background-color':'#3346FF'};
      }
      else{
        elem.style={'color':'#3346FF', 'background-color':'#FFFFFF'};
      }
    })
  }

  openDialog(obj: any): void {

    const dialogRef = this.dialog.open(ChoixMenuComponent, {
      panelClass: 'dialog',
      data: obj.object
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        obj.nombre+=1;
        let trouv=false;
        if(localStorage.getItem("panier")){
          let localPanier=JSON.parse(localStorage.getItem("panier")||'{}')
         
          for(let i=0; i<localPanier.orderMenuItem.length; i++){
            if (localPanier.orderMenuItem[i].Menu.id==result.id) {
              let existe=this.compareContenueMenus(localPanier.orderMenuItem[i].Menu.products, result.products);
              if (existe) {
                this.augmenterQuantiteMenu(localPanier.orderMenuItem[i], i)
                trouv=true;
                break;
              }
            }
          }

        }
        if(trouv==false){
          let orderMenuItem=new OrderMenuItems()
          this.global.prixTotal=this.global.prixTotal+result.price;
          orderMenuItem.Menu=result;
          orderMenuItem.Quantity=1;
          this.nbrItems+=this.nbrItems;
          //On met a jour le localStorage
          this.addBagInLocalStorage(new OrderProductItems, orderMenuItem);
          this.updateobjectLocalStorage("menu", obj)
        }
      }
    });
    
  }

  compareContenueMenus(MenuLocalProduits: Produit[], menuProducts: Produit[]){
    for(let i=0; i<menuProducts.length; i++){
      let trouv=false;
      for(let j=0; j<MenuLocalProduits.length; j++){
        if(menuProducts[i].id==MenuLocalProduits[j].id){
          trouv=true;
          break;
        }
      }
      if(trouv==false){
        return false;
      }

    }

    return true;
  }

  addPanier(obj: any){

    if (!(this.produitIsInPanier(obj.object))){
      this.global.prixTotal+=obj.object.price;
      let orderItem=new OrderProductItems();
      orderItem.Product=obj.object;
      orderItem.Quantity=1;
      obj.nombre+=1;
      this.nbrItems+=this.nbrItems;
      //On met a jour le localStorage
      this.addBagInLocalStorage(orderItem, new OrderMenuItems());
      this.updateobjectLocalStorage("produit", obj);

    }
    else{
      this.augmenterQuantiteProduit(obj);
    }
  }

  produitIsInPanier(obj: any){
    if(localStorage.getItem("panier")){
      let localPanier=JSON.parse(localStorage.getItem("panier")||'{}');
      for(let i=0; i<localPanier.orderItem.length; i++){
        if(localPanier.orderItem[i].Product.id==obj.id){
          return true;
        }
      }
    }
    return false;
  }

  getPosition(tab:any, obj:any){
    for(let i=0; i<tab.length; i++){

      if(tab[i].Product.id==obj.id){
        return i;
      }
    }

    return -1;
  }

  augmenterQuantiteProduit(product:any){
    product.nombre+=1;
    this.updateobjectLocalStorage("produit", product);
    let localPanier=JSON.parse(localStorage.getItem("panier")||'{}');
    for(let i=0; i<localPanier.orderItem.length; i++){
      if(localPanier.orderItem[i].Product.id==product.object.id){
        localPanier.orderItem[i].Quantity+=1;
        this.global.totalProduit+=1;
        localStorage.setItem("totalProduit", this.global.totalProduit.toString());
        this.global.prixTotal+=localPanier.orderItem[i].Product.price;
        //On met a jour le localStorage
        this.addBagInLocalStorage(localPanier.orderItem[i], new OrderMenuItems());
      }
    }
  }

  augmenterQuantiteMenu(orderMenuItem:OrderMenuItems, position: number){
    let localPanier=JSON.parse(localStorage.getItem("panier")||'{}');
    localPanier.orderMenuItem[position].Quantity+=1;
    this.global.totalProduit+=1;
    localStorage.setItem("totalProduit", this.global.totalProduit.toString());
    this.global.prixTotal+=localPanier.orderMenuItem[position].Menu.price;

    localStorage.setItem("panier", JSON.stringify(localPanier));
    localStorage.setItem("prixTotal", this.global.prixTotal.toString());
  }

  addOrder(){
    this.panier.montant=parseInt(localStorage.getItem("prixTotal")||'0');
    const dialogRef = this.dialog.open(AjoutCommandeComponent, {
      panelClass: 'dialog',
      data: {"panier":this.panier, "idRestaurant":this.restaurant.id}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==true){
        this.panier.orderMenuItem=[];
        this.panier.orderItem=[];
        this.panier.montant=0;
        this.global.prixTotal=0;
        this.global.totalProduit=0;
        localStorage.clear();
        this.showPanier=true;
      }
    })
  }

  addBagInLocalStorage(orderProduct: OrderProductItems, orderMenu: OrderMenuItems){

    if(!localStorage.getItem("panier")){
      if(orderMenu.Menu!=null){
        this.panier.orderMenuItem=[];
        this.panier.orderItem=[];
        this.panier.orderMenuItem.push(orderMenu);
      }
      else{
        this.panier.orderMenuItem=[];
        this.panier.orderItem=[];
        this.panier.orderItem.push(orderProduct);
      }
      localStorage.setItem("panier", JSON.stringify(this.panier));
      this.global.totalProduit+=1;
      localStorage.setItem("totalProduit", this.global.totalProduit.toString());
      this.nbrItems=0;
    }
    else{

      let localPanier=JSON.parse(localStorage.getItem("panier") || '{}');
      if(orderMenu.Menu!=null){
      
        localPanier.orderMenuItem.push(orderMenu);
        this.global.totalProduit+=1;
        localStorage.setItem("totalProduit",  this.global.totalProduit.toString())
      }

      if(orderProduct.Product!=null){

        let trouv=false;
        for(let i=0; i<localPanier.orderItem.length; i++){
          if(localPanier.orderItem[i].Product.id==orderProduct.Product.id){
            localPanier.orderItem[i]=orderProduct;
            trouv=true;
          }
        }
        if(trouv==false){
          localPanier.orderItem.push(orderProduct);
          this.global.totalProduit+=1;
          localStorage.setItem("totalProduit", this.global.totalProduit.toString());
        }

      }

      localStorage.setItem("panier", JSON.stringify(localPanier));
    }

    localStorage.setItem("prixTotal", this.global.prixTotal.toString());
  }

  updateobjectLocalStorage(typeData:string, data:any){
    if(typeData==="menu"){
      let localMenus=JSON.parse(localStorage.getItem("menus")|| '{}');
      for(let i=0; i<localMenus.length; i++){
        if(localMenus[i].object.id==data.object.id){
          localMenus[i]=data;
          break;
        }
      }
      localStorage.setItem("menus", JSON.stringify(localMenus));
    }
    else{
      let localProducts=JSON.parse(localStorage.getItem("products")|| '{}');
      for(let i=0; i<localProducts.length; i++){
        if(localProducts[i].object.id==data.object.id){
          localProducts[i]=data; 
          break;
        }
      }
      localStorage.setItem("products", JSON.stringify(localProducts));
    }
  }

}
