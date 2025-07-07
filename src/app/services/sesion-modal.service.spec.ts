/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SesionModalService } from './sesion-modal.service';

describe('Service: SesionModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SesionModalService]
    });
  });

  it('should ...', inject([SesionModalService], (service: SesionModalService) => {
    expect(service).toBeTruthy();
  }));
});
