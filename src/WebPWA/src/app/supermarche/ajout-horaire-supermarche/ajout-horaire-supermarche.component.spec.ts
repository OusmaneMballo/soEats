import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutHoraireSupermarcheComponent } from './ajout-horaire-supermarche.component';

describe('AjoutHoraireSupermarcheComponent', () => {
  let component: AjoutHoraireSupermarcheComponent;
  let fixture: ComponentFixture<AjoutHoraireSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutHoraireSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutHoraireSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
