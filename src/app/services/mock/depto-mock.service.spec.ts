import { TestBed, inject } from '@angular/core/testing';

import { DeptoMockService } from './depto-mock.service';

describe('DeptoMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeptoMockService]
    });
  });

  it('should be created', inject([DeptoMockService], (service: DeptoMockService) => {
    expect(service).toBeTruthy();
  }));
});
