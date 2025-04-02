/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExpedienteComponent } from './expediente.component';

describe('ExpedienteComponent', () => {
  let component: ExpedienteComponent;
  let fixture: ComponentFixture<ExpedienteComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
