import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerMenuComponent } from './composer-menu.component';

describe('ComposerMenuComponent', () => {
  let component: ComposerMenuComponent;
  let fixture: ComponentFixture<ComposerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
