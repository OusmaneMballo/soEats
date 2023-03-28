import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilRestaurantComponent } from './page-accueil-restaurant.component';

describe('PageAccueilRestaurantComponent', () => {
  let component: PageAccueilRestaurantComponent;
  let fixture: ComponentFixture<PageAccueilRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAccueilRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccueilRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
