import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Carte } from 'src/app/restaurant/carte';
import {MessageComponent} from 'src/app/message/message.component';
import { _isNumberValue } from '@angular/cdk/coercion';
import { LoaderService } from 'src/app/loader/loader.service';
import { TypeProduit } from '../type-produit';
import { Produit } from '../produit';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';
import { ProduitService } from '../services/produit.service';
import { CategorieService } from '../services/categorie.service';
import { Categorie, Rayon } from '../rayon';
import { RayonService } from '../services/rayon.service';

@Component({
  selector: 'app-ajout-produit-supermarche',
  templateUrl: './ajout-produit-supermarche.component.html',
  styleUrls: ['./ajout-produit-supermarche.component.css']
})
export class AjoutProduitSupermarcheComponent implements OnInit {

  produitForm: FormGroup;
  categories:Categorie[]=[];
  rayons:Rayon[]=[];
  photo: File;
  imgURL: any;
  disable = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Supermarche,
              public serviceSupermarche: SupermarcheService,
              public serviceCategorie: CategorieService,
              public serviceRayon: RayonService,
              public produitService: ProduitService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public loaderService:LoaderService
              ) { }

  ngOnInit(): void {
    this.getCategories()
    this.getRayons()
    this.produitForm=this.fb.group({
      nom: ['',  Validators.required],
      prix: ['',  Validators.required],
      categorie: ['',  Validators.required],
      rayon: ['',  Validators.required],
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

  addProduit(){
    setTimeout(() => {
      this.disable = true;
      if(this.produitForm.valid===true && this.photo !=null){
        if (_isNumberValue(this.produitForm.controls["prix"].value)){
          let produit=new Produit();
          produit.supermarketId = this.data.id;
          produit.name= this.produitForm.controls["nom"].value;
          produit.price= this.produitForm.controls["prix"].value;
          produit.categorieId= this.produitForm.controls["categorie"].value;
          produit.sectionId = this.produitForm.controls["rayon"].value;
          produit.description= this.produitForm.controls["description"].value;
          this.produitService.addProduit(this.photo, produit, this.data.id).subscribe(
            (resultat)=>{
            console.log(produit)

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

  getCategories(){
    this.serviceCategorie.getCategories().subscribe((data)=>{
      this.categories=data;
    }, (error)=>{
      console.log(error)
    });
  }

  getRayons(){
    this.serviceRayon.getRayons(this.data.id).subscribe((data)=>{
      this.rayons=data;
    }, (error)=>{
      console.log(error)
    });
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

