import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.css']
})
export class ConditionsComponent implements OnInit {

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
