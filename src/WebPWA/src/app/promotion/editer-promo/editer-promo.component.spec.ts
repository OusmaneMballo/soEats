import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPromoComponent } from './editer-promo.component';

describe('EditerPromoComponent', () => {
  let component: EditerPromoComponent;
  let fixture: ComponentFixture<EditerPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
