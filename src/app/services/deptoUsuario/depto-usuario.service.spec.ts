import { TestBed, inject } from '@angular/core/testing';

import { DeptoUsuarioService } from './depto-usuario.service';

describe('DeptoUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeptoUsuarioService]
    });
  });

  it('should be created', inject([DeptoUsuarioService], (service: DeptoUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
