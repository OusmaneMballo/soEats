import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifModalSupermarcheComponent } from './modif-modal-supermarche.component';

describe('ModifModalSupermarcheComponent', () => {
  let component: ModifModalSupermarcheComponent;
  let fixture: ComponentFixture<ModifModalSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifModalSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifModalSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
