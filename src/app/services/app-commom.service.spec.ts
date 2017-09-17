import { TestBed, inject } from '@angular/core/testing';

import { AppCommomService } from './app-commom.service';

describe('AppCommomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCommomService]
    });
  });
/*
  it('should be created', inject([AppCommomService], (service: AppCommomService) => {
    expect(service).toBeTruthy();
  }));
  */
});
