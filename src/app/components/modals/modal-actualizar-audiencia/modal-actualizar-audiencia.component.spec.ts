import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarAudienciaComponent } from './modal-actualizar-audiencia.component';

describe('ModalActualizarAudienciaComponent', () => {
  let component: ModalActualizarAudienciaComponent;
  let fixture: ComponentFixture<ModalActualizarAudienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalActualizarAudienciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActualizarAudienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
