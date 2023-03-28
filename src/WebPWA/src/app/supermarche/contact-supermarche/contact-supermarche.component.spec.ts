import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSupermarcheComponent } from './contact-supermarche.component';

describe('ContactSupermarcheComponent', () => {
  let component: ContactSupermarcheComponent;
  let fixture: ComponentFixture<ContactSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
