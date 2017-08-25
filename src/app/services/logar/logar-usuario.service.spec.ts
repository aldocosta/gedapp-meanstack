import { TestBed, inject } from '@angular/core/testing';

import { LogarUsuarioService } from './logar-usuario.service';

describe('LogarUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogarUsuarioService]
    });
  });

  it('should be created', inject([LogarUsuarioService], (service: LogarUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
