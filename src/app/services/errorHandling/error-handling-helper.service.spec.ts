import { TestBed, inject } from '@angular/core/testing';

import { ErrorHandlingHelperService } from './error-handling-helper.service';

describe('ErrorHandlingHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlingHelperService]
    });
  });

  it('should be created', inject([ErrorHandlingHelperService], (service: ErrorHandlingHelperService) => {
    expect(service).toBeTruthy();
  }));
});
