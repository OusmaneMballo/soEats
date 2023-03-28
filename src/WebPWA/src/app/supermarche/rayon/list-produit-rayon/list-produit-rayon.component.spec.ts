import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitRayonComponent } from './list-produit-rayon.component';

describe('ListProduitRayonComponent', () => {
  let component: ListProduitRayonComponent;
  let fixture: ComponentFixture<ListProduitRayonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProduitRayonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitRayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
