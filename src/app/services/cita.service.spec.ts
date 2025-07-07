/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CitaService } from './cita.service';

describe('Service: Cita', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitaService]
    });
  });

  it('should ...', inject([CitaService], (service: CitaService) => {
    expect(service).toBeTruthy();
  }));
});
