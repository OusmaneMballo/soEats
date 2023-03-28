import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSupermarcheComponent } from './description-supermarche.component';

describe('DescriptionSupermarcheComponent', () => {
  let component: DescriptionSupermarcheComponent;
  let fixture: ComponentFixture<DescriptionSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
