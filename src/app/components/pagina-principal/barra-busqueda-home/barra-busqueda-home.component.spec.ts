import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraBusquedaHomeComponent } from './barra-busqueda-home.component';

describe('BarraBusquedaHomeComponent', () => {
  let component: BarraBusquedaHomeComponent;
  let fixture: ComponentFixture<BarraBusquedaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraBusquedaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraBusquedaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
