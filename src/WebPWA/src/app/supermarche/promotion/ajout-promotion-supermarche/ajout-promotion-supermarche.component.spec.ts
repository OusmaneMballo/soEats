import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPromotionSupermarcheComponent } from './ajout-promotion-supermarche.component';

describe('AjoutPromotionSupermarcheComponent', () => {
  let component: AjoutPromotionSupermarcheComponent;
  let fixture: ComponentFixture<AjoutPromotionSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPromotionSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPromotionSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
