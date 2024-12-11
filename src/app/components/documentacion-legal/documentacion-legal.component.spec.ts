import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionLegalComponent } from './documentacion-legal.component';

describe('DocumentacionLegalComponent', () => {
  let component: DocumentacionLegalComponent;
  let fixture: ComponentFixture<DocumentacionLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentacionLegalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacionLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
