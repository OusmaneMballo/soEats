import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Supermarche } from '../../supermarche';
import { SupermarcheService } from '../../services/supermarche.service';

@Component({
  selector: 'app-ajout-logo-supermarche',
  templateUrl: './ajout-logo-supermarche.component.html',
  styleUrls: ['./ajout-logo-supermarche.component.css']
})

export class AjoutLogoSupermarcheComponent implements OnInit {

  logo: File;
  imgURL: any;
  idSupermarche: any;

  constructor(
    public dialogRef: MatDialogRef<AjoutLogoSupermarcheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Supermarche,
    public serviceSupermarche: SupermarcheService) {
      
    }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.imageUrl){
      this.imgURL = this.data.imageUrl;
    }
  }
  
  preview(files: any) {
    if (files.length === 0)
      return;
      
      this.logo = files[0];
 
    var reader = new FileReader();
    reader.readAsDataURL(this.logo); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  addLogo(): void{
     if(this.logo){
      this.serviceSupermarche.addLogoSupermarche(this.data.id, this.logo).subscribe(res => {
        this.onClose();
       });
     }
  }

}

