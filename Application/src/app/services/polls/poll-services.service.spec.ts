import { TestBed } from '@angular/core/testing';

import { PollServicesService } from './poll-services.service';

describe('PollServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollServicesService = TestBed.get(PollServicesService);
    expect(service).toBeTruthy();
  });
});
