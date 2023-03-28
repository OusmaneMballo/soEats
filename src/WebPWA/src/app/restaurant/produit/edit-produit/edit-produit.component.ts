import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Produit } from '../produit';
import { ProduitService } from '../produit.service';
import { ProductType } from '../typeProduct';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {

  editProduitForm: FormGroup;
  productTypes:ProductType[]=[];
  produit: Produit;
  imgURL: any;
  photo: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Produit,
    public produitService: ProduitService,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.imgURL = this.data.imageUrl;
    this.getTypes();
    this.editProduitForm=this.fb.group({
      
      type: [this.data.productType.id,  Validators.required],
      nom: [this.data.name,  Validators.required],
      prix: [this.data.price,  Validators.required],
      categorie: [this.data.categorie.toString(),  Validators.required],
      description: [this.data.description,  Validators.required]
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

  editProduit(){
    if (this.editProduitForm.valid===true){
      let produit=new Produit();

        produit.name= this.editProduitForm.controls["nom"].value;
        produit.price= this.editProduitForm.controls["prix"].value;
        produit.categorie= parseInt(this.editProduitForm.controls["categorie"].value);
        produit.description= this.editProduitForm.controls["description"].value;
        produit.cardId= this.data.cardId;
        produit.id= this.data.id;
        let type=this.setType(this.editProduitForm.controls["type"].value)
        if(type!=null){
          produit.productType=type;
          this.produitService.updateProduit(this.photo, produit).subscribe(
            (success)=>{
              this.onClose();
            },
            (error)=>{
              console.log(error);
            }
          )
        }
    }
  }

}
