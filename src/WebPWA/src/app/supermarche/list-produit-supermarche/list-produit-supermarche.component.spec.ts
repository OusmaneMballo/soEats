import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitSupermarcheComponent } from './list-produit-supermarche.component';

describe('ListProduitSupermarcheComponent', () => {
  let component: ListProduitSupermarcheComponent;
  let fixture: ComponentFixture<ListProduitSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProduitSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
