import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-message-reserv',
  templateUrl: './message-reserv.component.html',
  styleUrls: ['./message-reserv.component.css']
})
export class MessageReservComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
