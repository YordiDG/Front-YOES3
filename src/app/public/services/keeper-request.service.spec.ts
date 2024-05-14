import { TestBed } from '@angular/core/testing';

import { KeeperRequestService } from './keeper-request.service';

describe('KeeperRequestService', () => {
  let service: KeeperRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeeperRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
