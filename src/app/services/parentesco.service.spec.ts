import { TestBed } from '@angular/core/testing';

import { ParentescoService } from './parentesco.service';

describe('ParentescoService', () => {
  let service: ParentescoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentescoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
