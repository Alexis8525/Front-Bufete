/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContancosComponent } from './contancos.component';

describe('ContancosComponent', () => {
  let component: ContancosComponent;
  let fixture: ComponentFixture<ContancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
