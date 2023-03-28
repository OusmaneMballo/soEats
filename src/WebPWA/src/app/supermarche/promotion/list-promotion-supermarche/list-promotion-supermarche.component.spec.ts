import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromotionSupermarcheComponent } from './list-promotion-supermarche.component';

describe('ListPromotionSupermarcheComponent', () => {
  let component: ListPromotionSupermarcheComponent;
  let fixture: ComponentFixture<ListPromotionSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPromotionSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPromotionSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
