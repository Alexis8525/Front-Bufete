/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SesionServiceService } from './sesion-service.service';

describe('Service: SesionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SesionServiceService]
    });
  });

  it('should ...', inject([SesionServiceService], (service: SesionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
