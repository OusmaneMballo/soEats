import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutImageRayonComponent } from './ajout-image-rayon.component';

describe('AjoutImageRayonComponent', () => {
  let component: AjoutImageRayonComponent;
  let fixture: ComponentFixture<AjoutImageRayonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutImageRayonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutImageRayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
