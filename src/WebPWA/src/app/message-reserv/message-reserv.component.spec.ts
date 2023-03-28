import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReservComponent } from './message-reserv.component';

describe('MessageReservComponent', () => {
  let component: MessageReservComponent;
  let fixture: ComponentFixture<MessageReservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageReservComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
