import { Component, OnInit } from '@angular/core';
export interface Reservation {
  nom: string;
  prenom: string;
  dateheure: string;
  telephone: string;
  email: string;
 
}

const ELEMENT_DATA: Reservation[] = [
  {nom: 'NDIAYE', prenom: 'Abdou', dateheure:'18/03/2020 a 15H00',  telephone: '774532145', email:'abdou@gmail.com'},
  {nom: 'NDIAYE', prenom: 'Abdou', dateheure:'18/03/2020 a 15H00',  telephone: '774532145', email:'abdou@gmail.com'},
  {nom: 'NDIAYE', prenom: 'Abdou', dateheure:'18/03/2020 a 15H00',  telephone: '774532145', email:'abdou@gmail.com'},
  {nom: 'NDIAYE', prenom: 'Abdou', dateheure:'18/03/2020 a 15H00',  telephone: '774532145', email:'abdou@gmail.com'},
  {nom: 'NDIAYE', prenom: 'Abdou', dateheure:'18/03/2020 a 15H00',  telephone: '774532145', email:'abdou@gmail.com'},


];
@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css']
})
export class ListeReservationComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'dateheure', 'telephone', 'email', 'statu','valider','annuler'];
  dataSource = ELEMENT_DATA
 
  constructor() {
  }
  ngOnInit(): void {
   

  }


}
