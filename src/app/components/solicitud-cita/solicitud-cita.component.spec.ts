import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCitaComponent } from './solicitud-cita.component';

describe('SolicitudCitaComponent', () => {
  let component: SolicitudCitaComponent;
  let fixture: ComponentFixture<SolicitudCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
