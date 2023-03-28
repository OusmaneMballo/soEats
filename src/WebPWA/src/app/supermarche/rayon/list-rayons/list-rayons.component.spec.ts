import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRayonsComponent } from './list-rayons.component';

describe('ListRayonsComponent', () => {
  let component: ListRayonsComponent;
  let fixture: ComponentFixture<ListRayonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRayonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRayonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
