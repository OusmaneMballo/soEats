import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesSupermarcheComponent } from './horaires-supermarche.component';

describe('HorairesSupermarcheComponent', () => {
  let component: HorairesSupermarcheComponent;
  let fixture: ComponentFixture<HorairesSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorairesSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorairesSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
