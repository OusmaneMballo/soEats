import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsMenuComponent } from './show-products-menu.component';

describe('ShowProductsMenuComponent', () => {
  let component: ShowProductsMenuComponent;
  let fixture: ComponentFixture<ShowProductsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
