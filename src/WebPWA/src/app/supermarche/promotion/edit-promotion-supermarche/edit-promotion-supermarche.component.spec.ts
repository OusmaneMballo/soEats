import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotionSupermarcheComponent } from './edit-promotion-supermarche.component';

describe('EditPromotionSupermarcheComponent', () => {
  let component: EditPromotionSupermarcheComponent;
  let fixture: ComponentFixture<EditPromotionSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromotionSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPromotionSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
