import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRestoComponent } from './creation-resto.component';

describe('CreationRestoComponent', () => {
  let component: CreationRestoComponent;
  let fixture: ComponentFixture<CreationRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
