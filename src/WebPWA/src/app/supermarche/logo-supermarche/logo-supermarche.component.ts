import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Supermarche } from '../supermarche';
import { SupermarcheService } from '../services/supermarche.service';
import { AjoutLogoSupermarcheComponent } from './ajout-logo-supermarche/ajout-logo-supermarche.component';
@Component({
  selector: 'app-logo-supermarche',
  templateUrl: './logo-supermarche.component.html',
  styleUrls: ['./logo-supermarche.component.css']
})

export class LogoSupermarcheComponent implements OnInit {

  @Input() supermarche: Supermarche;

  constructor(public dialog: MatDialog, public serviceSupermarche: SupermarcheService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutLogoSupermarcheComponent, {
      width: '470px',
      data: this.supermarche,
      panelClass: 'myapp-no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.serviceSupermarche.getSupermarcheById(this.supermarche.id).subscribe(res => {
        this.supermarche = res;
      });
  });
  }
}
