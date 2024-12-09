/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerNotasComponent } from './ver-notas.component';

describe('VerNotasComponent', () => {
  let component: VerNotasComponent;
  let fixture: ComponentFixture<VerNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
