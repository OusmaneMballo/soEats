import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from '../rayon';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})

export class AjoutCategorieComponent implements OnInit {

  logo: File;
  imgURL: any;
  idSuperMarche: any;
  errorInput: string = '';
  categorie: Categorie;
  disable = false;

  @ViewChild('FormCreateResto') form: any;

  constructor(
    public dialogRef: MatDialogRef<AjoutCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serviceCategorie: CategorieService) {

  }

  ngOnInit(): void {
    this.categorie = new Categorie();
  }

  createCategorie() {
    this.disable = true;
    this.serviceCategorie.addCategorie(this.categorie).subscribe(
      (response) => {
        this.form.reset();
        this.dialogRef.close();
      },
      (error) => {
        this.disable = false;
      }
    );

  }

}


