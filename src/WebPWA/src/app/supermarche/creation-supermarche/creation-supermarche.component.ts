import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import Swal from 'sweetalert2';
import { FormCreationSuperMarcheComponent } from '../../supermarche/form-creation-super-marche/form-creation-super-marche.component';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';


@Component({
  selector: 'app-creation-supermarche',
  templateUrl: './creation-supermarche.component.html',
  styleUrls: ['./creation-supermarche.component.css']
})

export class CreationSupermarcheComponent implements OnInit {

  content: Supermarche[] = [];
  supermarketcontent: Supermarche[] = [];
  counter: number = 6;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  ownerId: any;
  isSupermarket: boolean;
  listSupermarche: Supermarche[] = [];

  constructor(
              private router:ActivatedRoute,
              public dialog:MatDialog,
              private serviceSupermarche:SupermarcheService,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit(): void {
    this.ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId');
    this.getContent();
  }
  openDialog(){
    const dialogRef = this.dialog.open(FormCreationSuperMarcheComponent, {
      width: '470px',
      panelClass: 'myapp-no-padding-dialog',
      data: {
        ownerId:this.router.snapshot.params.ownerId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getContent();
    });
  }

  // openDialogSuperMarche(){
  //   const dialogRef = this.dialog.open(FormCreationSuperMarcheComponent, {
  //     width: '470px',
  //     panelClass: 'myapp-no-padding-dialog',
  //     data: {
  //       ownerId:this.router.snapshot.params.ownerId
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getContent();
  //   });
  // }

  openDialogCategorie(){
    // const dialogRef = this.dialog.open(AddCategorieComponent, {
    //   width: '470px',
    //   panelClass: 'myapp-no-padding-dialog',
    // });
  }

  openDialogUpdateCategorie(){
    // const dialogRef = this.dialog.open(UpdateCategoryComponent, {
    //   // width: '470px',
    //   // height: '470px',
    //   panelClass: 'myapp-no-padding-dialog',
    // });
  }

  getContent(){
    let currentOwnerId=this.router.snapshot.params.ownerId; //Récuperation du ownerId du restaurateur en cours de connexion
    this.serviceSupermarche.getAllSupermarcheByOwnerId(currentOwnerId).subscribe(data => {
      this.listSupermarche = data;
         if(this.listSupermarche.length>6){
          for(let j=0;j<6;j++)
          {
            this.getStatutSupermarket(this.listSupermarche[j]);
            this.content.push(this.listSupermarche[j]);
          }
         }else{

          for(let j=0;j<this.listSupermarche.length;j++){
            this.getStatutSupermarket(this.listSupermarche[j]);
          }
            this.content=this.listSupermarche;
         }
    });
  }

  getSupermarkets(){
    for(let i=this.counter;i<this.listSupermarche.length;i++)
    {
      this.getStatutSupermarket(this.listSupermarche[i]);
      this.content.push(this.listSupermarche[i]);
        if((i+1)%3==0){
          break;
        } 
    }
    this.counter+=3; 

  }

  hidenSupermarche(){
    this.content=[];
    this.counter=6;
    for(let i=0;i<6;i++)
    {
      this.content.push(this.listSupermarche[i]);
    }
  }

  async getStatutSupermarket(supermarche: Supermarche){
    if(supermarche.description!=null && supermarche.description!=""){
      this.value+=25;
    }

    if(supermarche.imageUrl!=null && supermarche.imageUrl!=""){
      this.value+=25;
    }

    if(supermarche.photosUrls!=null && supermarche.photosUrls[0]!=null){
      this.value+=25;
    }

    for (let index = 0; index < supermarche.openingHours.length; index++) {
      if(supermarche.openingHours[index]!=null){
        this.value+=25;
        break;
      }
      
    }
    supermarche.pourcentage=this.value;
    this.value=0;
  }

  supprimerSupermarche(id: string){
    Swal.fire({
      title: 'Voulez vous supprimer le supermarché ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Annuler',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceSupermarche.deleteSupermarceById(id).subscribe((response)=>{
          this.getContent();
          Swal.fire(
            'Succès!',
            'le supermarché a été supprimer.',
            'success'
          )
      },
      (error)=>{
        Swal.fire(
          'Supprimer!',
          "le supermarché n'a pas été supprimer.",
          'error'
        )
      })
      }
    })
 
  }

}
