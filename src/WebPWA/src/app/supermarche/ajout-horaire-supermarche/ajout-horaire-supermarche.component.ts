import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Horaire } from 'src/app/shared/horaire';
import { Slot } from 'src/app/shared/slot';
import { HoraireService } from 'src/app/shared/horaire.service';
import { MessageComponent } from 'src/app/message/message.component';
import { Supermarche } from '../supermarche';

@Component({
  selector: 'app-ajout-horaire-supermarche',
  templateUrl: './ajout-horaire-supermarche.component.html',
  styleUrls: ['./ajout-horaire-supermarche.component.css']
})

export class AjoutHoraireSupermarcheComponent implements OnInit {

  days: any[] = [];
  horaire = new Horaire();
  slot1 = new Slot();
  slot2 = new Slot();
  horaireForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private horaireService: HoraireService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Supermarche) { }

  ngOnInit(): void {
    this.days = [{ 'id': 1, 'name': 'Lundi' }, { 'id': 2, 'name': 'Mardi' }, { 'id': 3, 'name': 'Mercredi' }, { 'id': 4, 'name': 'Jeudi' }, { 'id': 5, 'name': 'Vendredi' }, { 'id': 6, 'name': 'Samedi' }, { 'id': 0, 'name': 'Dimanche' }];
    this.horaireForm = this.fb.group({
      jour: ['', Validators.required],
      slot1StartTime: [''],
      slot1EndTime: [''],
      slot2StartTime: [''],
      slot2EndTime: ['']
    })
    this.slot1.startTime = null;
    this.slot1.endTime = null;
    this.slot2.startTime = null;
    this.slot2.endTime = null;

  }

  //Fonction qui permet d'ajout des horaire d'un supermarché
  addHoraire() {
    let uuid_supermarche = this.data.id;
    if (this.horaireForm.valid === true) {
      //On affecte la valeur null aux inputs qui ne sont pas saisi pour le bon fonctionnement vers l'API
      this.slot1.startTime = this.horaireForm.controls["slot1StartTime"].value !== null ? this.horaireForm.controls["slot1StartTime"].value : null;
      this.slot1.endTime = this.horaireForm.controls["slot1EndTime"].value !== null ? this.horaireForm.controls["slot1EndTime"].value : null;
      this.slot2.startTime = this.horaireForm.controls["slot2StartTime"].value !== null ? this.horaireForm.controls["slot2StartTime"].value : null;
      this.slot2.endTime = this.horaireForm.controls["slot2EndTime"].value !== null ? this.horaireForm.controls["slot2EndTime"].value : null;
      if (this.horaireForm.controls["slot2StartTime"].value == '' && this.horaireForm.controls["slot2EndTime"].value == '') {
        this.slot2.startTime = null;
        this.slot2.endTime = null;
      }
      //Verification si l'utilisateur a saisi au moins le créneau1 
      if ((this.slot1.startTime !== null && this.slot1.endTime !== null)) {
        //Verification si startTime et endTime du créneau2 ne sont pas vide
        if ((this.slot2.startTime !== null && this.slot2.endTime === null) || (this.slot2.startTime === null && this.slot2.endTime !== null)) {
          this.openMessageDialog("creneau2");
        }
        else {

          //Verification si l'utilisateur a saisi des horaires valides
          if (this.horaireService.testCaractereHoraire(this.slot1.startTime) === true && this.horaireService.testCaractereHoraire(this.slot1.endTime) === true
            && this.horaireService.testCaractereHoraire(this.slot2.startTime) === true && this.horaireService.testCaractereHoraire(this.slot2.endTime) === true) {
            this.horaire.dayOfWeek = this.horaireForm.controls["jour"].value;
            this.horaire.slot1 = this.slot1;
            this.horaire.slot2 = this.slot2;
            //Appel d'API
            this.horaireService.addHoraireSupermarche(this.horaire, uuid_supermarche).subscribe(
              () => {
                this.openMessageDialog("success");
                localStorage.setItem('horaireIsAdd', "1");
              },
              (error) => {
                this.openMessageDialog("error");
              }
            );
          }
          else {
            this.openMessageDialog("error");
          }
        }

      }
      else {
        if (this.slot2.startTime === '' || this.slot2.endTime === '') {
          this.openMessageDialog("taille");
        }
        else {
          this.openMessageDialog("creneau1");
        }
      }
    }
    else {
      this.openMessageDialog("day_error");
    }
  }

  /**
   * Fonction de recuperation des créneaux
   * en fonction du jour selectioné
   * **/
  horaireDuJour($event: any) {

    //Recuperation de l'id du jour séléctioné
    let dayOfWeek = $event.target.value

    let uuid_supermarche = this.data.id;

    //Recuperation des horaires du restaurant de l'uuid 
    this.horaireService.getSupermarketOpenHoursBySlugId(uuid_supermarche).subscribe(data => {
      let trouv = false;
      data.openingHours.forEach(element => {
        if (element.dayOfWeek == dayOfWeek) {
          this.slot1 = element.slot1;
          // this.slot2=element.slot2;
          trouv = true;
        }
      });
      if (trouv == false) {
        this.slot1.startTime = null;
        this.slot1.endTime = null;
        // this.slot2.startTime=null;
        // this.slot2.endTime=null;
      }
    });
  }

  //Fonction pour declancher la boite de dialog
  openMessageDialog(message: any) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: {
        val: message
      },
      panelClass: 'myCss'
    });
    setTimeout(() => { dialogRef.close() }, 2500);
  }
}

