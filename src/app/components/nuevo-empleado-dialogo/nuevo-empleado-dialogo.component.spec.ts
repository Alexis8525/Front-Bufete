import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEmpleadoDialogoComponent } from './nuevo-empleado-dialogo.component';

describe('NuevoEmpleadoDialogoComponent', () => {
  let component: NuevoEmpleadoDialogoComponent;
  let fixture: ComponentFixture<NuevoEmpleadoDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoEmpleadoDialogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoEmpleadoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
