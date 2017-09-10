import { TestBed, inject } from '@angular/core/testing';

import { GedDeptoService } from './ged-depto.service';

describe('GedDeptoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GedDeptoService]
    });
  });

  it('should be created', inject([GedDeptoService], (service: GedDeptoService) => {
    expect(service).toBeTruthy();
  }));
});
