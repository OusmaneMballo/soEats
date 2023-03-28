import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Restaurant } from '../../restaurant';
import { RestaurantService } from '../../restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import {MessageComponent} from 'src/app/message/message.component';
import { AffichageImageComponent } from '../../menu-restaurant/affichage-image/affichage-image.component';
import { Image } from 'src/app/shared/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajour-images-restaurant',
  templateUrl: './ajour-images-restaurant.component.html',
  styleUrls: ['./ajour-images-restaurant.component.css']
})
export class AjourImagesRestaurantComponent implements OnInit {

  photo: File;
  imgURL: any='';
  maxMenu: boolean;
  photos: Image[];
  photoId: string =  '';
  data : Restaurant;
  

  constructor(public dialogRef: MatDialogRef<AjourImagesRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: string,
    public serviceRestaurant: RestaurantService, public dialog: MatDialog, private router: Router) { 
      
    }

  ngOnInit(): void {
    this.getRestaurant();
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

  getRestaurant(){
    this.serviceRestaurant.getRestaurantById(this.dataId).subscribe(res => {
      this.data = res;
      console.log("data", this.data);
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
      this.serviceRestaurant.addPhotoRestaurant(this.data.id, this.photo).subscribe(res => {
        this.getRestaurant();
       });
    }
    else{
      this.openErrorDialog("error Ajout photo");
    }
  }

  updatePhoto(photoId : string): void{
    this.serviceRestaurant.updatePhotoRestaurant(this.data.id, this.photo, photoId).subscribe(res => {
      this.getRestaurant();
     });
  }

  deletePhoto(photoId : string): void{
      this.serviceRestaurant.deletePhotoRestaurant(this.data.id, photoId).subscribe(res => {
        this.getRestaurant();
        console.log(res);
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
