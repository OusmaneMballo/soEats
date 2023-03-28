import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPromoComponent } from './ajout-promo.component';

describe('AjoutPromoComponent', () => {
  let component: AjoutPromoComponent;
  let fixture: ComponentFixture<AjoutPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
