import { TestBed } from '@angular/core/testing';

import { TipoidService } from './tipoid.service';

describe('TipoidService', () => {
  let service: TipoidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
