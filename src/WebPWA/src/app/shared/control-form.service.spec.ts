import { TestBed } from '@angular/core/testing';

import { ControlFormService } from './control-form.service';

describe('ControlFormService', () => {
  let service: ControlFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
