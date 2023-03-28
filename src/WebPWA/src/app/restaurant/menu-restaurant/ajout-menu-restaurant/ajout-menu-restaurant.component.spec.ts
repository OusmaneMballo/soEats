import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMenuRestaurantComponent } from './ajout-menu-restaurant.component';

describe('AjoutMenuRestaurantComponent', () => {
  let component: AjoutMenuRestaurantComponent;
  let fixture: ComponentFixture<AjoutMenuRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutMenuRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMenuRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
