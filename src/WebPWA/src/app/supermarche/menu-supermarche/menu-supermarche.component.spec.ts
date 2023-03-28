import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSupermarcheComponent } from './menu-supermarche.component';

describe('MenuSupermarcheComponent', () => {
  let component: MenuSupermarcheComponent;
  let fixture: ComponentFixture<MenuSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
