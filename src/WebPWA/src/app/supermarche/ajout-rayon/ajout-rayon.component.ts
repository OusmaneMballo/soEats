import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AjoutLogoRestaurantComponent } from '../logo-restaurant/ajout-logo-restaurant/ajout-logo-restaurant.component';
// import { Restaurant, RestaurantCategorie } from '../restaurant';
// import { RestaurantService } from '../restaurant.service';
import { ControlFormService } from 'src/app/shared/control-form.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie, Rayon } from '../rayon';
import { RayonService } from '../services/rayon.service';
import { CategorieService } from '../services/categorie.service';
import { AjoutImageRayonComponent } from '../ajout-image-rayon/ajout-image-rayon.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajout-rayon',
  templateUrl: './ajout-rayon.component.html',
  styleUrls: ['./ajout-rayon.component.css']
})

export class AjoutRayonComponent implements OnInit {

  logo: File;
  imgURL: any;
  idRestaurant: any;
  errorInput: string = '';
  rayon: Rayon;
  rayonForm: FormGroup;
  disable = false;

  @ViewChild('FormCreateResto') form: any;

  rayonCategories: Categorie[] = [];
  categoriesSelected = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<AjoutRayonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serviceRayon: RayonService,
    public serviceCategory: CategorieService,
    private fb: FormBuilder,
    private controlFormService: ControlFormService) {

  }

  ngOnInit(): void {
    this.rayon=new Rayon();
    this.rayonForm=this.fb.group({
      displayName: ['',  Validators.required],
      categoriesSelected: ['',  Validators.required],
    })

    this.getRayonCategorie();
  }

  getRayonCategorie() {
    this.serviceCategory.getCategories().subscribe((data) => {
      this.rayonCategories = data;
    })
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

  /**
   * Creation d'un nouveau RAYON
   * **/

   createRayon() {
    this.rayon.superMarketId = this.data.id;
    this.rayon.categories = this.categoriesSelected.value;
    this.serviceRayon.addRayon(this.rayon, this.logo ).subscribe(
      (response) => {
        this.form.reset();
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rayon bien créé',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error) => {
        this.disable = false;
      }
    );

  }

}
