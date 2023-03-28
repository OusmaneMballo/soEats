import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesSupermarcheComponent } from './images-supermarche.component';

describe('ImagesSupermarcheComponent', () => {
  let component: ImagesSupermarcheComponent;
  let fixture: ComponentFixture<ImagesSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
