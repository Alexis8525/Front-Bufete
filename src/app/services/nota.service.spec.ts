/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotaService } from './nota.service';

describe('Service: Nota', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotaService]
    });
  });

  it('should ...', inject([NotaService], (service: NotaService) => {
    expect(service).toBeTruthy();
  }));
});
