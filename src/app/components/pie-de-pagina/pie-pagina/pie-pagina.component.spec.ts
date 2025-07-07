/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PiePaginaComponent } from './pie-pagina.component';

describe('PiePaginaComponent', () => {
  let component: PiePaginaComponent;
  let fixture: ComponentFixture<PiePaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiePaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiePaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
