/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EspecialidadService } from './especialidad.service';

describe('Service: Especialidad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspecialidadService]
    });
  });

  it('should ...', inject([EspecialidadService], (service: EspecialidadService) => {
    expect(service).toBeTruthy();
  }));
});
