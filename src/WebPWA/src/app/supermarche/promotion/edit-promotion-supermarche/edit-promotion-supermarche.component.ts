import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { Categorie } from '../../rayon';
import { CategorieService } from '../../services/categorie.service';
import { PromotionSupermarcheService } from '../../services/promotion-supermarche.service';
import { Promotion } from '../promotion';

@Component({
  selector: 'app-edit-promotion-supermarche',
  templateUrl: './edit-promotion-supermarche.component.html',
  styleUrls: ['./edit-promotion-supermarche.component.css']
})

export class EditPromotionSupermarcheComponent implements OnInit {

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
  promotion: Promotion;
  
  constructor(@Inject(
    MAT_DIALOG_DATA) public data: any,
    public dialog:  MatDialogRef<EditPromotionSupermarcheComponent>,
    private fb: FormBuilder,
    private serviceCategorie: CategorieService,
    private servicePromo: PromotionSupermarcheService) { }

  ngOnInit(): void {
    this.promoForm=this.fb.group({
      name: [this.data.name,  Validators.required],
      categorie: [this.data.categories],
      reduction: [this.data.reduction,  Validators.required],
      dateDebut: [this.data.startDate,  Validators.required],
      dateFin: [this.data.endDate,  Validators.required],
    });
    this.promotion=new Promotion();
    this.promotion.categories=[];
    if(this.data.categorie!=null){
      this.promotion.categories.push(this.data.categorie);
    }
    this.initialize();
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

  changementStyle(title:string){

    this.reductions.forEach((elem)=>{
      if (elem.pourcentage==title) {
        elem.style={'background-color':'#146356'};
        this.promoForm.controls.reduction.setValue(title);
      }
      else{
        elem.style={'background-color':'#b9b9b9'};
      }
    })
  }

  getCategories(){
    this.serviceCategorie.getCategories().subscribe((data)=>{
      this.listCategories=data;
    })
  }

  serializeDateDebut(event: MatDatepickerInputEvent<Date>){
    this.promoForm.controls.dateDebut.setValue(this.promoForm.controls.dateDebut.value.toISOString());
  }
  serializeDateFin(event: MatDatepickerInputEvent<Date>){
    this.promoForm.controls.dateFin.setValue(this.promoForm.controls.dateFin.value.toISOString());
  }

  validationDate(){
    let tabStartDate=this.promoForm.value['dateDebut'].split('-')
    let tabEndDate=this.promoForm.value['dateFin'].split('-')

    if(parseInt(tabStartDate[0])>parseInt(tabEndDate[0])){
      return false;
    }
    else{
      if( parseInt(tabStartDate[1])>parseInt(tabEndDate[1]) && parseInt(tabStartDate[0])==parseInt(tabEndDate[0])){
        return false;
      }
      else{
        if(parseInt(tabStartDate[2])>parseInt(tabEndDate[2]) && parseInt(tabStartDate[1])==parseInt(tabEndDate[1])){
          return false;
        }
        else{
          return true;
        }
      }
      
    }
  }

  editPromotion(){
    if(this.promoForm.valid){
      this.promotion.endDate=this.promoForm.controls.dateFin.value;
      this.promotion.startDate=this.promoForm.controls.dateDebut.value;
      this.promotion.reduction=this.promoForm.value['reduction'];
      this.promotion.name=this.promoForm.controls.name.value;

      if(this.validationDate()){
        this.promotion.id=this.data.id
        this.promotion.superMarketId=this.data.superMarket.id;
        if(this.selectedlistType.length>=1){
          this.promotion.categories=[];
          for(let i=0; i<this.selectedlistType.length; i++){
            for(let j=0; j<this.listCategories.length; j++){
              if(this.selectedlistType[i]===this.listCategories[j].id){
                this.promotion.categories.push(this.listCategories[j]);
                break;
              }
            }
          }
        }
        this.servicePromo.updatePromotionById(this.promotion).subscribe((result)=>{
          this.promoForm.reset();
          this.dialog.close(this.promotion);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Promotion modifiée avec succès !',
            showConfirmButton: false,
            timer: 1500
          });
        }, (error)=>{
          console.log(error); 
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

}

