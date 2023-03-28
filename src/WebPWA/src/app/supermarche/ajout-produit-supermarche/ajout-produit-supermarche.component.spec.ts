import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProduitSupermarcheComponent } from './ajout-produit-supermarche.component';

describe('AjoutProduitSupermarcheComponent', () => {
  let component: AjoutProduitSupermarcheComponent;
  let fixture: ComponentFixture<AjoutProduitSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutProduitSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutProduitSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
