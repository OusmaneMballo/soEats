import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutLogoSupermarcheComponent } from './ajout-logo-supermarche.component';

describe('AjoutLogoSupermarcheComponent', () => {
  let component: AjoutLogoSupermarcheComponent;
  let fixture: ComponentFixture<AjoutLogoSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutLogoSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutLogoSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
