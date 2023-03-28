import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MessageComponent} from 'src/app/message/message.component';
import { Image } from 'src/app/shared/image';
import { Router } from '@angular/router';
import { Supermarche } from '../../supermarche';
import { SupermarcheService } from '../../services/supermarche.service';
import { AffichageImageComponent } from 'src/app/restaurant/menu-restaurant/affichage-image/affichage-image.component';

@Component({
  selector: 'app-ajout-images-supermarche',
  templateUrl: './ajout-images-supermarche.component.html',
  styleUrls: ['./ajout-images-supermarche.component.css']
})
export class AjoutImagesSupermarcheComponent implements OnInit {

  photo: File;
  imgURL: any='';
  maxMenu: boolean;
  photos: Image[];
  photoId: string =  '';
  data : Supermarche;
  

  constructor(public dialogRef: MatDialogRef<AjoutImagesSupermarcheComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: string,
    public serviceSupermarche: SupermarcheService, public dialog: MatDialog, private router: Router) { 
      
    }

  ngOnInit(): void {
    this.getSupermarche();
    this.photos = this.data.photosUrls;
    this.maxMenu=false;
    if(this.data.photosUrls.length>=5){
      this.maxMenu=true;
    }
  }
  
  onClose(): void {
    this.dialogRef.close();
  }

  UpdatePhoto(id: string){
    this.photoId = id;
  }

  getSupermarche(){
    this.serviceSupermarche.getSupermarcheById(this.dataId).subscribe(res => {
      this.data = res;
      console.log( this.data);
    });
  }


  onFileSelectForUpdatePhotoOrAddPhoto($event: any){ 
      if($event.target.files){
        let reader =new FileReader();
        reader.readAsDataURL($event.target.files[0]);
        reader.onload=(event: any)=>{
          this.imgURL=event.target.result;
          if(this.imgURL!==''){
            this.photo=<File>$event.target.files[0];
                if(this.photoId){
                this.updatePhoto(this.photoId);
                }else{
                  this.addPhoto();
                }
          }
        }
   }
}

  addPhoto(): void{
    if(this.data.photosUrls.length < 5){
      this.serviceSupermarche.addPhotoSupermarche(this.data.id, this.photo).subscribe(res => {
        this.getSupermarche();
       });
    }
    else{
      this.openErrorDialog("error Ajout photo");
    }
  }

  updatePhoto(photoId : string): void{
    this.serviceSupermarche.updatePhotoSupermarche(this.data.id, this.photo, photoId).subscribe(res => {
      this.getSupermarche();
     });
  }

  deletePhoto(photoId : string): void{
      this.serviceSupermarche.deletePhotoSupermarche(this.data.id, photoId).subscribe(res => {
        this.getSupermarche();
       }, err => {
        console.log(err);
      });
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
