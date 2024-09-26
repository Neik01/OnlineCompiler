import { TestBed } from '@angular/core/testing';

import { CoderoomService } from './coderoom.service';

describe('CoderoomService', () => {
  let service: CoderoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoderoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
