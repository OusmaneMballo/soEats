import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../produit.service';
import { ProductType } from '../typeProduct';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {

  @ViewChild('FormCreateTypeProduct') form: any;
  typeProduct: ProductType;

  constructor(private serviceProduct: ProduitService) { }

  ngOnInit(): void {
    this.typeProduct=new ProductType();
  }

  createProductType(){
    this.serviceProduct.addTypeProduct(this.typeProduct).subscribe((Response)=>{
      this.form.reset();
    }, (error)=>{
      console.log(error);
    });
  }

}
