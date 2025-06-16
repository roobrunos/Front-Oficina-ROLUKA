import { TestBed } from '@angular/core/testing';

import { ServicoExecutadoService } from './servico-executado.service';

describe('ServicoExecutadoService', () => {
  let service: ServicoExecutadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoExecutadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
