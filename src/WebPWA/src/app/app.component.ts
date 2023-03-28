import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { VariablesGlobales} from 'src/app/shared/globale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'africa-eats';

  constructor(public global: VariablesGlobales){}

  ngOnInit(): void {
    if(localStorage.getItem('uN')){
      this.global.loginDisplay=true;
      this.global.userName=localStorage.getItem('uN');
      localStorage.setItem("panier", "");
      localStorage.setItem("totalProduit", "");
    }
    else{
      this.global.loginDisplay=false;
      if(localStorage.getItem('totalProduit') && localStorage.getItem('totalProduit')!=null){
        this.global.totalProduit=parseInt(localStorage.getItem('totalProduit')||'0');
        this.global.prixTotal=parseInt(localStorage.getItem('prixTotal')||'0')
      }
    }
  }
}
