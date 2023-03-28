import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-affichage-image',
  templateUrl: './affichage-image.component.html',
  styleUrls: ['./affichage-image.component.css']
})
export class AffichageImageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AffichageImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
