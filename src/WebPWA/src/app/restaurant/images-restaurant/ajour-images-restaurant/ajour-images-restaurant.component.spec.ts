import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjourImagesRestaurantComponent } from './ajour-images-restaurant.component';

describe('AjourImagesRestaurantComponent', () => {
  let component: AjourImagesRestaurantComponent;
  let fixture: ComponentFixture<AjourImagesRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjourImagesRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjourImagesRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
