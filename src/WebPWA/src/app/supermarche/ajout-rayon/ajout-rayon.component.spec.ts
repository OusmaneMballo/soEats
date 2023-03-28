import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRayonComponent } from './ajout-rayon.component';

describe('AjoutRayonComponent', () => {
  let component: AjoutRayonComponent;
  let fixture: ComponentFixture<AjoutRayonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutRayonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
