import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutImagesSupermarcheComponent } from './ajout-images-supermarche.component';

describe('AjoutImagesSupermarcheComponent', () => {
  let component: AjoutImagesSupermarcheComponent;
  let fixture: ComponentFixture<AjoutImagesSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutImagesSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutImagesSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
