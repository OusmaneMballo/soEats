import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSupermarcheComponent } from './logo-supermarche.component';

describe('LogoSupermarcheComponent', () => {
  let component: LogoSupermarcheComponent;
  let fixture: ComponentFixture<LogoSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
