import { TestBed } from '@angular/core/testing';

import { AuthintercepteurService } from './authintercepteur.service';

describe('AuthintercepteurService', () => {
  let service: AuthintercepteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthintercepteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
