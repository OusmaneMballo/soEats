import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesRestaurantComponent } from './images-restaurant.component';

describe('ImagesRestaurantComponent', () => {
  let component: ImagesRestaurantComponent;
  let fixture: ComponentFixture<ImagesRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
