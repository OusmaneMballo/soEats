import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMenuClientComponent } from './details-menu-client.component';

describe('DetailsMenuClientComponent', () => {
  let component: DetailsMenuClientComponent;
  let fixture: ComponentFixture<DetailsMenuClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMenuClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMenuClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
