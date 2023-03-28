import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationRestoComponent } from './form-creation-resto.component';

describe('FormCreationRestoComponent', () => {
  let component: FormCreationRestoComponent;
  let fixture: ComponentFixture<FormCreationRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreationRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreationRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
