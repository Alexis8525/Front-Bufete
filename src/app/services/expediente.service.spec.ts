/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ExpedienteService } from './expediente.service';

describe('Service: Expediente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpedienteService]
    });
  });

  it('should ...', inject([ExpedienteService], (service: ExpedienteService) => {
    expect(service).toBeTruthy();
  }));
});
