/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgendaServiceService } from './agenda-service.service';

describe('Service: AgendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendaServiceService]
    });
  });

  it('should ...', inject([AgendaServiceService], (service: AgendaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
