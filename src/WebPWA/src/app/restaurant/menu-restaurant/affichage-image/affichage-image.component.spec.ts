import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageImageComponent } from './affichage-image.component';

describe('AffichageImageComponent', () => {
  let component: AffichageImageComponent;
  let fixture: ComponentFixture<AffichageImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
