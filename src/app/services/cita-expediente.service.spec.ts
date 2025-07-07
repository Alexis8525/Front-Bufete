import { TestBed } from '@angular/core/testing';

import { CitaExpedienteService } from './cita-expediente.service';

describe('CitaExpedienteService', () => {
  let service: CitaExpedienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaExpedienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
