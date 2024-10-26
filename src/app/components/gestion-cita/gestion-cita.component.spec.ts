import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCitaComponent } from './gestion-cita.component';

describe('GestionCitaComponent', () => {
  let component: GestionCitaComponent;
  let fixture: ComponentFixture<GestionCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
