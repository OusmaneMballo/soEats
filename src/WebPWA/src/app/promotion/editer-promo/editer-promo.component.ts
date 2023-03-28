import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProduitService } from 'src/app/restaurant/produit/produit.service';
import { ProductType } from 'src/app/restaurant/produit/typeProduct';
import Swal from 'sweetalert2';
import { Promotion } from '../promotion';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-editer-promo',
  templateUrl: './editer-promo.component.html',
  styleUrls: ['./editer-promo.component.css']
})
export class EditerPromoComponent implements OnInit {

  listTypes: any[]=[];
  today = new Date();
  minEndDate = new Date();
  listProductType: ProductType[]=[];
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
    public dialog:  MatDialogRef<EditerPromoComponent>,
    private fb: FormBuilder,
    private serviceTypeProduct: ProduitService,
    private servicePromo: PromotionService,) { }

  ngOnInit(): void {
    this.promoForm=this.fb.group({
      name: [this.data.name,  Validators.required],
      categorie: [this.data.categories],
      reduction: [this.data.reduction,  Validators.required],
      dateDebut: [this.data.startDate,  Validators.required],
      dateFin: [this.data.endDate,  Validators.required],
    });
    this.promotion=new Promotion();
    this.promotion.productTypes=[];
    this.promotion.categories=[];
    if(this.data.productType!=null){
      this.promotion.productTypes.push(this.data.productType);
    }
    if(this.data.categorie!=null){
      this.promotion.categories.push(this.data.categorie);
    }
    this.initialize();
  }

  initialize(){
    this.serviceTypeProduct.getTypeProduct().subscribe((data)=>{
      this.listProductType=data;
      this.listTypes=[
        {id : 0 ,  libelle : 'Entrée',  type: 'Type catégorie', child: { "state": "Active" } },
        {id : 1 ,  libelle : 'Boisson',  type: 'Type catégorie', child: { "state": "Active" } },
        {id : 2 ,  libelle : 'Plat',  type: 'Type catégorie', child: { "state": "Active" } },
        {id : 3 ,  libelle : 'Dessert',  type: 'Type catégorie', child: { "state": "Active" } },
        {id : 4 ,  libelle : 'Patisserie',  type: 'Type catégorie', child: { "state": "Active" } }
      ];
      this.listProductType.forEach((item)=>{
        this.listTypes.push({ id: item.id, libelle:item.displayName, type: 'Type produit', child: { "state": "Active" } })
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

  getProductType(){
    this.serviceTypeProduct.getTypeProduct().subscribe((data)=>{
      this.listProductType=data;
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
        this.promotion.restaurantId=this.data.restaurant.id;
        if(this.selectedlistType.length>=1){
          this.promotion.productTypes=[];
          this.promotion.categories=[];
          for(let i=0; i<this.selectedlistType.length; i++){
            for(let j=0; j<this.listProductType.length; j++){
              if(this.selectedlistType[i]===this.listProductType[j].id){
                this.promotion.productTypes.push(this.listProductType[j]);
                break;
              }
            }
            if(typeof this.selectedlistType[i]==="number"){
              this.promotion.categories.push(this.selectedlistType[i]);
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
