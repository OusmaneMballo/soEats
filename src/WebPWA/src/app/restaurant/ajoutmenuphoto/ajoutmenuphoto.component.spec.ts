import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutmenuphotoComponent } from './ajoutmenuphoto.component';

describe('AjoutmenuphotoComponent', () => {
  let component: AjoutmenuphotoComponent;
  let fixture: ComponentFixture<AjoutmenuphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutmenuphotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutmenuphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
