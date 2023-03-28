import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutLogoRestaurantComponent } from './ajout-logo-restaurant.component';

describe('AjoutLogoRestaurantComponent', () => {
  let component: AjoutLogoRestaurantComponent;
  let fixture: ComponentFixture<AjoutLogoRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutLogoRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutLogoRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
