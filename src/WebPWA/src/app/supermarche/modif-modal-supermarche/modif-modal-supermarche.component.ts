import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { SupermarcheService } from '../services/supermarche.service';
import { Supermarche } from '../supermarche';

@Component({
  selector: 'app-modif-modal-supermarche',
  templateUrl: './modif-modal-supermarche.component.html',
  styleUrls: ['./modif-modal-supermarche.component.css']
})

export class ModifModalSupermarcheComponent implements OnInit {

  f: FormGroup;
  submitted = false;
  

  constructor(public modifModalRef: MatDialogRef<ModifModalSupermarcheComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public supermarcheService: SupermarcheService, private router: Router) { }

  ngOnInit(): void {
    this.f = this.formBuilder.group({
      supermarketId: [null, null],
      phoneNumber : ['', [Validators.required,  Validators.pattern("[0-9]{9}")]],
      address : ['', Validators.required],
      email: ['', null],
      name : ['', Validators.required],
      ownerId: ['', null],
      description : ['', Validators.required],
    });
     this.initForm(this.data.supermarcheModif); 
  }

  initForm(supermarche: Supermarche) {
    this.f = this.formBuilder.group({
      supermarketId : [supermarche.id, null],
      phoneNumber: [supermarche.phoneNumber,[ Validators.required,  Validators.pattern(new RegExp("[0-9]{9}"))]],
      address : [supermarche.address, Validators.required],
      email: [supermarche.email, null],
      name : [supermarche.name, Validators.required],
      ownerId: [supermarche.ownerId, null],
      description : [supermarche.description, null],
    });
  }

  onEditSupermarche(data: FormGroup) {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    }
     this.supermarcheService.updateSupermarcheById(this.data.supermarcheModif.id, data).subscribe(res => {
        this.onClose();         
     }, err => {
       console.log(err);
     });
  }  
 
  onClose(): void {
    this.modifModalRef.close();
  }

}
