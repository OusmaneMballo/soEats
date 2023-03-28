import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlFormService } from 'src/app/shared/control-form.service';
import Swal from 'sweetalert2';
import { CommandeService } from '../commande.service';
import { Order } from '../order';
import { Panier } from '../panier';
import { ActivatedRoute, Router} from '@angular/router';
import { VariablesGlobales } from 'src/app/shared/globale';
import { zoneLivraison} from 'src/app/shared/zone-livraison';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-ajout-commande',
  templateUrl: './ajout-commande.component.html',
  styleUrls: ['./ajout-commande.component.css']
})
export class AjoutCommandeComponent implements OnInit {

  tarifLivraison: any;
  zones:any[]=[];
  sommeTotal: any;
  fraisZone: any;
  commandForm: FormGroup;
  errorMessage:string;
  slugId: string;
  disable = false;


  constructor(
    private fb: FormBuilder,
    private controlFormService: ControlFormService,
    private commandeService: CommandeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public global: VariablesGlobales,
    public loaderService:LoaderService
    ) { }

  ngOnInit(): void {
    this.getDeliveryZones();
    this.commandForm=this.fb.group({
      nom: ['',  Validators.required],
      prenom: ['',  Validators.required],
      adresse: ['',  Validators.required],
      telephone: ['',  Validators.required],
      email: ['',  Validators.required],
      livraison: ['',  Validators.required],
      zone: [''],
    });

    this.slugId=this.activatedRoute.snapshot.paramMap.get('slugId')||'';
    console.clear()
  }

  getDeliveryZones(){
    this.commandeService.getDelivryZones().subscribe((data)=>{
      data.sort(function (a, b){
        return a.zoneId - b.zoneId;
      })
      this.zones=data;
    })
  }

  retour(){
    window.location.href="/restaurant/"+this.slugId+"/menus";
  }

  radioChange(){
    if(this.commandForm.controls["livraison"].value=='0'){
      this.tarifLivraison=1;
      this.commandForm.get('zone')?.setValidators([Validators.required]);
    }
    else{
      this.tarifLivraison=0;
      this.sommeTotal=0
      this.commandForm.get('zone')?.clearValidators();
      this.commandForm.get('zone')?.updateValueAndValidity();
      
    }
  }

  selectEven($event: any){
    //Recuperation de la zone séléctioné

    this.zones.forEach((item)=>{
      for(let i=0; i<item.zones.length; i++){
        if(item.zones[i]==$event.target.value){
          this.fraisZone=item.deliveryPrice;
        }
      }
      
    });
    this.sommeTotal=this.global.prixTotal + this.fraisZone;
  }

  addCommande(){
    this.disable = true;
    setTimeout(() => {
    if(this.commandForm.valid==true){
      if(this.controlFormService.testNumeroTelephone(this.commandForm.controls["telephone"].value)){
        if(this.controlFormService.testEmail(this.commandForm.controls["email"].value)){
          let order= new Order();
          order.CustomerAdress=this.commandForm.controls["adresse"].value;
          order.CustomerEmail=this.commandForm.controls["email"].value;
          order.CustomerFirstname=this.commandForm.controls["prenom"].value;
          order.CustomerLastname=this.commandForm.controls["nom"].value;;
          order.CustomerPhoneNumber='221'+this.commandForm.controls["telephone"].value;
          order.DeliveryZone= this.commandForm.controls["zone"].value;
          order.DeliveryPrice= this.fraisZone;
          order.OrderDeliveryMethod=parseInt(this.commandForm.controls["livraison"].value);
          if (localStorage.getItem("panier") && localStorage.getItem("ID") && localStorage.getItem("prixTotal")) {
            let localPanier= JSON.parse(localStorage.getItem("panier")||'')

            order.Amount=parseInt(localStorage.getItem("prixTotal")||'');
            order.orderProductItems=localPanier.orderItem;
            order.orderMenuItems=localPanier.orderMenuItem;
            order.RestaurantId=localStorage.getItem("ID")||"";
            order.OrderDate= new Date();
            this.commandeService.addCommande(order.RestaurantId, order).subscribe((result)=>{
              this.commandForm.reset();
                this.errorMessage="";
                Swal.fire({
                  width: '25rem',
                  position: 'center',
                  icon: 'success',
                  title: 'Votre commande a été envoyée', 
                  showConfirmButton: false,
                  timer: 2500
                });
                localStorage.clear();
                this.global.prixTotal=0;
                this.global.totalProduit=0;
                this.disable = false;
                this.router.navigateByUrl("/restaurant/"+this.slugId);
            });
          }
          
        }
        else{
          this.errorMessage="Oups!... email invalide";
          this.disable = false;
        }
      }
      else{
        this.errorMessage="Oups!... numéro de téléphone invalide";
        this.disable = false;

      }
    }
    else{
      this.errorMessage="Tous les champs sont obligatoires";
      this.disable = false;

    }
  },1000);
  }

}
