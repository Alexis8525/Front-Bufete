/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapaSitioComponent } from './mapa-sitio.component';

describe('MapaSitioComponent', () => {
  let component: MapaSitioComponent;
  let fixture: ComponentFixture<MapaSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
