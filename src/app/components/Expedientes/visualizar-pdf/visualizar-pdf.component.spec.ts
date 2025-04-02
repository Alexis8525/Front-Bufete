import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPdfComponent } from './visualizar-pdf.component';

describe('VisualizarPdfComponent', () => {
  let component: VisualizarPdfComponent;
  let fixture: ComponentFixture<VisualizarPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
