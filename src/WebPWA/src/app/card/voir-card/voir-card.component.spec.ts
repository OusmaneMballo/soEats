import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirCardComponent } from './voir-card.component';

describe('VoirCardComponent', () => {
  let component: VoirCardComponent;
  let fixture: ComponentFixture<VoirCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
