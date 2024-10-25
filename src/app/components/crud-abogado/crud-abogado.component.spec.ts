import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAbogadoComponent } from './crud-abogado.component';

describe('CrudAbogadoComponent', () => {
  let component: CrudAbogadoComponent;
  let fixture: ComponentFixture<CrudAbogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAbogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAbogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
