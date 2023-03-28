import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPaiementComponent } from './option-paiement.component';

describe('OptionPaiementComponent', () => {
  let component: OptionPaiementComponent;
  let fixture: ComponentFixture<OptionPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
