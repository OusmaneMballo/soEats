import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Restaurant } from 'src/app/restaurant/restaurant';
import { RestaurantService } from 'src/app/restaurant/restaurant.service';
import { ProduitService } from 'src/app/restaurant/produit/produit.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Produit } from '../produit';
import { Carte } from 'src/app/restaurant/carte';
import {MessageComponent} from 'src/app/message/message.component';
import { _isNumberValue } from '@angular/cdk/coercion';
import { LoaderService } from 'src/app/loader/loader.service';
import { ProductType } from '../typeProduct';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  produitForm: FormGroup;
  productTypes:ProductType[]=[];
  photo: File;
  imgURL: any;
  carte: Carte;
  disable = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Restaurant,
              public serviceRestaurant: RestaurantService,
              public produitService: ProduitService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public loaderService:LoaderService
              ) { }

  ngOnInit(): void {
    this.getCard();
    this.getTypes();
    this.produitForm=this.fb.group({
      type: ['',  Validators.required],
      nom: ['',  Validators.required],
      prix: ['',  Validators.required],
      categorie: ['',  Validators.required],
      description: ['',  Validators.required]
    })
  }

  onClose(){
    this.dialog.closeAll();
  }

  preview(files: any) {
    if (files.length === 0)
      return;
      
      this.photo = files[0];
 
    var reader = new FileReader();
    reader.readAsDataURL(this.photo); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  getCard(){
    this.produitService.getCarteByIdRestaurant(this.data.id).subscribe(
      (data)=>{
            this.carte=data;
      }
    );
  }

  getTypes(){
    this.produitService.getTypeProduct().subscribe((data)=>{
      this.productTypes=data;
    }, (error)=>{
      console.log(error)
    });
  }

  setType(typeId: any){
    if(this.productTypes!=null && typeId!=null){
      for(let j=0; j<this.productTypes.length; j++){

        if(this.productTypes[j].id==typeId){

          return this.productTypes[j];
        }
      }
    }
    return null;
  }

  addProduit(idCard: any){
    setTimeout(() => {
      this.disable = true;
      if(this.produitForm.valid===true && this.photo !=null){
        if (_isNumberValue(this.produitForm.controls["prix"].value)){
          let produit=new Produit();
  
          produit.name= this.produitForm.controls["nom"].value;
          produit.price= this.produitForm.controls["prix"].value;
          produit.categorie= parseInt(this.produitForm.controls["categorie"].value);
          produit.description= this.produitForm.controls["description"].value;
          let type=this.setType(this.produitForm.controls["type"].value);
          if (this.carte !=null && type!=null){
            produit.cardId = idCard;
            produit.productType=type;
            this.produitService.addProduit(idCard, this.photo, produit).subscribe(
              (resultat)=>{
                this.openMessageDialog("successProduit");
                this.produitForm.reset(this.disable = false);
                this.imgURL=null;
              },
              (error)=>{
                console.log(error);
                this.openMessageDialog("errorAddProduit");
                this.disable = false;
              }
            );
          }
          else{
            this.disable = false;
          }
        }
        else{
          this.openMessageDialog("errorPrixProduit");
          this.disable = false;
        }
      }
      else{
        this.openMessageDialog("errorProduit");
        this.disable = false;
      }
    }, 1000);
  }

  //Fonction pour declancher la boite de dialog
  openMessageDialog(message:any) {
    const dialogRef= this.dialog.open(MessageComponent, {
      data: {
        val: message
      },
      panelClass: 'myCss'
    });
    setTimeout(()=>{dialogRef.close()}, 2500);
  }

}
