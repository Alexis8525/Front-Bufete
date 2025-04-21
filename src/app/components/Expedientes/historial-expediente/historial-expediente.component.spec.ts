import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialExpedienteComponent } from './historial-expediente.component';

describe('HistorialExpedienteComponent', () => {
  let component: HistorialExpedienteComponent;
  let fixture: ComponentFixture<HistorialExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialExpedienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
