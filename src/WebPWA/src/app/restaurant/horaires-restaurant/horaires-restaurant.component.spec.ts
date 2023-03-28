import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesRestaurantComponent } from './horaires-restaurant.component';

describe('HorairesRestaurantComponent', () => {
  let component: HorairesRestaurantComponent;
  let fixture: ComponentFixture<HorairesRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorairesRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorairesRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
