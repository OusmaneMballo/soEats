import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confidentialite',
  templateUrl: './confidentialite.component.html',
  styleUrls: ['./confidentialite.component.css']
})
export class ConfidentialiteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scroll(el: HTMLElement) {  
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
  }

}
