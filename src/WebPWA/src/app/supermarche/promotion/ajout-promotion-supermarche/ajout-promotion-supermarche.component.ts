import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Categorie } from '../../rayon';
import { CategorieService } from '../../services/categorie.service';
import { PromotionSupermarcheService } from '../../services/promotion-supermarche.service';
import { Supermarche } from '../../supermarche';
import { Promotion } from '../promotion';

@Component({
  selector: 'app-ajout-promotion-supermarche',
  templateUrl: './ajout-promotion-supermarche.component.html',
  styleUrls: ['./ajout-promotion-supermarche.component.css']
})

export class AjoutPromotionSupermarcheComponent implements OnInit {

  listTypes: any[]=[];
  today = new Date();
  minEndDate = new Date();
  listCategories: Categorie[]=[];
  reductions:any[]=[
    {pourcentage : '10', style: {'background-color':'#b9b9b9'}},
    {pourcentage : '20', style: {'background-color':'#b9b9b9'}},
    {pourcentage : '30', style: {'background-color':'#b9b9b9'}},
    {pourcentage : '40', style: {'background-color':'#b9b9b9'}},
    {pourcentage : '50', style: {'background-color':'#b9b9b9'}}
  ];
  selectedlistType: any[]=[];
  promoForm: FormGroup;
  photo: File;
  imgURL: any;

  constructor(@Inject(
    MAT_DIALOG_DATA) public data: Supermarche,
    public dialog: MatDialogRef<AjoutPromotionSupermarcheComponent>,
    private fb: FormBuilder,
    private serviceCategorie: CategorieService,
    private servicePromo: PromotionSupermarcheService,            
  ) { }

  ngOnInit(): void {

    this.promoForm=this.fb.group({
      name: ['',  Validators.required],
      categorie: ['',  Validators.required],
      reduction: ['',  Validators.required],
      dateDebut: ['',  Validators.required],
      dateFin: ['',  Validators.required],
    });

    this.initialize();

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

  changementStyle(title:string){

    this.reductions.forEach((elem)=>{
      if (elem.pourcentage==title) {
        elem.style={'background-color':'#3346FF'};
        this.promoForm.controls.reduction.setValue(title);
      }
      else{
        elem.style={'background-color':'#b9b9b9'};
      }
    })
  }

  validationDate(){
    let tabStartDate=this.promoForm.value['dateDebut'].split('-')
    let tabEndDate=this.promoForm.value['dateFin'].split('-')
      if(parseInt(tabStartDate[0])>parseInt(tabEndDate[0])){
        this.promoForm.value['dateDebut']='';
        this.promoForm.value['dateFin']='';
        return false;
      }
      else{
        if( parseInt(tabStartDate[1])>parseInt(tabEndDate[1]) && parseInt(tabStartDate[0])==parseInt(tabEndDate[0])){
          this.promoForm.value['dateDebut']='';
          this.promoForm.value['dateFin']='';
          return false;
        }
        else{
          if(parseInt(tabStartDate[2])>parseInt(tabEndDate[2]) && parseInt(tabStartDate[1])==parseInt(tabEndDate[1])){
            this.promoForm.value['dateDebut']='';
            this.promoForm.value['dateFin']='';
            return false;
          }
          else{
            return true;
          }
        }
      }
  }

  addPromotion(){
    if(this.promoForm.valid && this.photo !=null){
      let promotion=new  Promotion();
      promotion.endDate=this.promoForm.controls.dateFin.value;
      promotion.startDate=this.promoForm.controls.dateDebut.value;
      promotion.reduction=this.promoForm.value['reduction'];
      this.promoForm.controls.dateDebut.setValue(this.promoForm.controls.dateDebut.value.toISOString());
      this.promoForm.controls.dateFin.setValue(this.promoForm.controls.dateFin.value.toISOString());
      promotion.name=this.promoForm.controls.name.value;
      promotion.categories=[];

      if(this.validationDate()){
        promotion.superMarketId=this.data.id;
        for(let i=0; i<this.selectedlistType.length; i++){
          for(let j=0; j<this.listCategories.length; j++){
            if(this.selectedlistType[i]===this.listCategories[j].id){
              promotion.categories.push(this.listCategories[j]);
              break;
            }
          }
        }

        this.servicePromo.addPromotion(promotion, this.photo).subscribe((result)=>{
          this.promoForm.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Promotion créer avec succès !',
            showConfirmButton: false,
            timer: 1500
          });

          this.dialog.close(promotion);
        });

      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oups...',
          text: 'Date de début et date de fin incohérente!',
        })
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oups...',
        text: 'Tous les champs sont obligatoir!',
      })
    }
  }

  getProductType(){
    this.serviceCategorie.getCategories().subscribe((data)=>{
      this.listCategories=data;
    })
  }

  initialize(){
    this.serviceCategorie.getCategories().subscribe((data)=>{
      this.listCategories=data;
      this.listTypes=[];
      this.listCategories.forEach((item)=>{
        this.listTypes.push({ id: item.id, libelle:item.displayName, type: 'Categories', child: { "state": "Active" } })
      });
    })
  }

}

