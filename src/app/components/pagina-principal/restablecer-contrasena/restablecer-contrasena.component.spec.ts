/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RestablecerContrasenaComponent } from './restablecer-contrasena.component';

describe('RestablecerContrasenaComponent', () => {
  let component: RestablecerContrasenaComponent;
  let fixture: ComponentFixture<RestablecerContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecerContrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecerContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
