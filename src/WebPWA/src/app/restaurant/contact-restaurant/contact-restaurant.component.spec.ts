import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRestaurantComponent } from './contact-restaurant.component';

describe('ContactRestaurantComponent', () => {
  let component: ContactRestaurantComponent;
  let fixture: ComponentFixture<ContactRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
