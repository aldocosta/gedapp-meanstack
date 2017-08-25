import { TestBed, inject } from '@angular/core/testing';

import { MySharedService } from './my-shared.service';

describe('MySharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySharedService]
    });
  });

  it('should be created', inject([MySharedService], (service: MySharedService) => {
    expect(service).toBeTruthy();
  }));
});
