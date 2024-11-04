/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudClienteComponent } from './crud-cliente.component';

describe('CrudClienteComponent', () => {
  let component: CrudClienteComponent;
  let fixture: ComponentFixture<CrudClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
