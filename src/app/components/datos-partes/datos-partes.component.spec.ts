import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPartesComponent } from './datos-partes.component';

describe('DatosPartesComponent', () => {
  let component: DatosPartesComponent;
  let fixture: ComponentFixture<DatosPartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPartesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
