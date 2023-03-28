import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixMenuComponent } from './choix-menu.component';

describe('ChoixMenuComponent', () => {
  let component: ChoixMenuComponent;
  let fixture: ComponentFixture<ChoixMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
