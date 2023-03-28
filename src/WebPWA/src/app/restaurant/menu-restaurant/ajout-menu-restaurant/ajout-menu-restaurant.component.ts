import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AjoutmenuphotoComponent } from '../../ajoutmenuphoto/ajoutmenuphoto.component';
import { Restaurant } from '../../restaurant';
import { RestaurantService } from '../../restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { AffichageImageComponent } from '../affichage-image/affichage-image.component';
import {MessageComponent} from 'src/app/message/message.component';

@Component({
  selector: 'app-ajout-menu-restaurant',
  templateUrl: './ajout-menu-restaurant.component.html',
  styleUrls: ['./ajout-menu-restaurant.component.css']
})
export class AjoutMenuRestaurantComponent implements OnInit {

  menu: File;
  imgURL: any;
  urlMenu1: any='';
  idRestaurant: any;
  maxMenu: boolean;
  

  constructor(public dialogRef: MatDialogRef<AjoutmenuphotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Restaurant,
    public serviceRestaurant: RestaurantService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.maxMenu=false;
    //On verifit si le nombre de munu n'est pas depassé
    if(this.data.menuImagesUrls.length>=3){
      this.maxMenu=true;
    }
  }
  
  onClose(): void {
    this.dialogRef.close();
  }


  onFileSelect($event: any){
      //On teste si l'image est bien chargée
      if($event.target.files){
        //l'objet readr nous permet d'avoir un preview du menu
        let reader =new FileReader();
        reader.readAsDataURL($event.target.files[0]);
        reader.onload=(event: any)=>{
          this.urlMenu1=event.target.result;
          if(this.urlMenu1!==''){
            this.menu=<File>$event.target.files[0];
            this.addMenu();
          }
        }
      }
  }

  addMenu(): void{
    if(!this.maxMenu){
      this.serviceRestaurant.addMenuRestaurant(this.data.id, this.menu).subscribe(res => {
        window.location.reload();
       });
    }
    else{
      this.openErrorDialog("errorMenu");
    }
  }

  openDialog(img: any): void {
    this.dialog.open(AffichageImageComponent, {
      data: img,
      panelClass: 'padding-dialog'
    });
  }

  openErrorDialog(message:any) {
    const dialogRef= this.dialog.open(MessageComponent, {
      data: {
        val: message
      },
      panelClass: 'myCss'
    });
    setTimeout(()=>{dialogRef.close()}, 2800);
  }
}
