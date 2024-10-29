import { TestBed } from '@angular/core/testing';

import { ExecuteCodeService } from './execute-code.service';

describe('ExecuteCodeService', () => {
  let service: ExecuteCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecuteCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
