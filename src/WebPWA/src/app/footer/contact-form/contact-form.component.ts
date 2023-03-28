import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Contact } from './contact';
import { ControlFormService } from 'src/app/shared/control-form.service';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  errorInput=false;
  
  constructor(private fb: FormBuilder, private controlFormService: ControlFormService, private serviceContact: ContactService ) { }

  ngOnInit(): void {
    this.contactForm=this.fb.group({
      prenom: ['',  Validators.required],
      nom: ['',  Validators.required],
      email: ['',  Validators.required],
      objet: ['',  Validators.required],
      message: ['',  Validators.required]
    })
  }

  sendMessage(){
      if(this.contactForm.valid){
        if(this.controlFormService.testEmail(this.contactForm.controls["email"].value)){
          let contact=new Contact();
          contact.firstname = this.contactForm.controls["prenom"].value;
          contact.lastname = this.contactForm.controls["nom"].value;
          contact.title = this.contactForm.controls["objet"].value;
          contact.email = this.contactForm.controls["email"].value;
          contact.message = this.contactForm.controls["message"].value;
      
          this.serviceContact.sendContactForm(contact).subscribe(res => {
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Votre message envoyé avec succès !',
              showConfirmButton: false,
              timer: 1500
            });
          }, err => {
           console.log(err);
          });

          this.contactForm.reset();
        }
        else{
          this.errorInput=true;
        }
      }
      else{
        Swal.fire({
          position: 'center',
          width: '25rem',
          icon: 'error',
          title: 'Oups! toutes les champs sont obligatoires',
          showConfirmButton: false,
          timer: 2500
        })
      }
  }

}
