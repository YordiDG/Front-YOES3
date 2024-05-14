import { TestBed } from '@angular/core/testing';

import { KeepersService } from './keepers.service';

describe('KeepersService', () => {
  let service: KeepersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

