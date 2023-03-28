import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSupermarcheComponent } from './creation-supermarche.component';

describe('CreationSupermarcheComponent', () => {
  let component: CreationSupermarcheComponent;
  let fixture: ComponentFixture<CreationSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
