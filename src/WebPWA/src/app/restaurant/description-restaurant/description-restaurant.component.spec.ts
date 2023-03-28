import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionRestaurantComponent } from './description-restaurant.component';

describe('DescriptionRestaurantComponent', () => {
  let component: DescriptionRestaurantComponent;
  let fixture: ComponentFixture<DescriptionRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
