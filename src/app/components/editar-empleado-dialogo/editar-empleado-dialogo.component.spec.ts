import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleadoDialogoComponent } from './editar-empleado-dialogo.component';

describe('EditarEmpleadoDialogoComponent', () => {
  let component: EditarEmpleadoDialogoComponent;
  let fixture: ComponentFixture<EditarEmpleadoDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEmpleadoDialogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpleadoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
