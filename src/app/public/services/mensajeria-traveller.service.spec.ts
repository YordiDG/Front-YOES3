import { TestBed } from '@angular/core/testing';

import { MensajeriaTravellerService } from './mensajeria-traveller.service';

describe('MensajeriaTravellerService', () => {
  let service: MensajeriaTravellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeriaTravellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
