import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoRestaurantComponent } from './logo-restaurant.component';

describe('LogoRestaurantComponent', () => {
  let component: LogoRestaurantComponent;
  let fixture: ComponentFixture<LogoRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
