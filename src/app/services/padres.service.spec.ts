import { TestBed } from '@angular/core/testing';

import { PadresService } from './padres.service';

describe('PadresService', () => {
  let service: PadresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PadresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
