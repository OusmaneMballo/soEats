import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from './contact';

export const API_URL = environment.SERVICE_URL;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
}


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendContactForm(contactForm: Contact){
    return this.http.post(API_URL + 'contactus',contactForm);
  }
}
