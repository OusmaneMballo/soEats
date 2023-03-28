import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifModalComponent } from './modif-modal.component';

describe('ModifModalComponent', () => {
  let component: ModifModalComponent;
  let fixture: ComponentFixture<ModifModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
